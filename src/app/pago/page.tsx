"use client";

import { getAccessToken, getSessionToken } from "@/lib/niubiz/services";
import { db } from "@/utils/indexeddb-database";
import { useLiveQuery } from "dexie-react-hooks";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import countries from "@/utils/countries.json";
import Swal from "sweetalert2";
import { useGlobalContext } from "@/components/Providers";
import { useRouter } from "next/navigation";

const elementStyles = {
   base: {
      color: "#666666",
      fontWeight: 500,
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      placeholder: {
         color: "#A19F9F",
      },
      autofill: {
         color: "#e39f48",
      },
   },
   invalid: {
      color: "#E25950",
      "::placeholder": {
         color: "#FFCCA5",
      },
   },
};

export default function Pago() {
   const router = useRouter();

   const [loading, setLoading] = useState<boolean>(false);

   const [dateExists, setDateExists] = useState<boolean>(false);
   const [accessToken, setAccessToken] = useState<string>("");
   const [sessionKey, setSessionKey] = useState<string>("");
   const [sessionKeyExpirationTime, setSessionKeyExpirationTime] =
      useState<number>(0);
   const [amount, setAmount] = useState<any>();
   const [merchantId, setMerchantId] = useState<string>("456879856");
   const [activePayment, setActivePayment] = useState<boolean>(false);
   const [adults, setAdults] = useState<number>();
   const [children, setChildren] = useState<number>();
   const [startSecurityConfiguration, setStartSecurityConfiguration] =
      useState<boolean>(false);

   const [name, setName] = useState<string>();
   const [lastName, setLastName] = useState<string>();
   const [email, setEmail] = useState<string>();
   const [phone, setPhone] = useState<string>();
   const [country, setCountry] = useState<string>();
   const [garage, setGarage] = useState<boolean>(false);
   const [tours, setTours] = useState<boolean>(false);
   const [idRoom, setIdRoom] = useState<string>();

   const dates: any = useLiveQuery(() => db.dates.toArray());
   const rooms: any = useLiveQuery(() => db.rooms.toArray());

   const payformRef: any = useRef(null);
   const cardNumberRef: any = useRef(null);
   const cardExpiryRef: any = useRef(null);
   const cardCvcRef: any = useRef(null);
   const cardUnified: any = useRef(null);

   const { availableRooms } = useGlobalContext();

   const calculateMonth = (month: number) => {
      switch (month) {
         case 1:
            return "Enero";
            break;
         case 2:
            return "Febrero";
            break;
         case 3:
            return "Marzo";
            break;
         case 4:
            return "Abril";
            break;
         case 5:
            return "Mayo";
            break;
         case 6:
            return "Junio";
            break;
         case 7:
            return "Julio";
            break;
         case 8:
            return "Agosto";
            break;
         case 9:
            return "Septiembre";
            break;
         case 10:
            return "Octubre";
            break;
         case 11:
            return "Noviembre";
            break;
         case 12:
            return "Diciembre";
            break;
      }
   };

   const getAvailableRooms = async ({
      checkIn,
      checkOut,
   }: {
      checkIn: string;
      checkOut: string;
   }) => {
      const response = await fetch("/api/get-available-rooms", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            checkIn,
            checkOut,
         }),
      });

      const result = await response.json();

      return result;
   };

   function diferenciaEnDias(fecha1: string, fecha2: string) {
      // Parsear las fechas
      const fechaInicio: any = new Date(fecha1);
      const fechaFin: any = new Date(fecha2);

      // Calcular la diferencia en milisegundos
      const diferenciaEnMilisegundos = fechaFin - fechaInicio;

      // Convertir la diferencia en días
      const milisegundosEnUnDia = 24 * 60 * 60 * 1000; // Milisegundos en un día
      const diferenciaEnDias = Math.round(
         diferenciaEnMilisegundos / milisegundosEnUnDia
      );

      return diferenciaEnDias;
   }

   const createForm = () => {
      cardNumberRef.current = payformRef.current.createElement(
         "card-number",
         {
            style: elementStyles,
            placeholder: "Número de tarjeta",
         },
         "txtNumeroTarjeta"
      );

      cardExpiryRef.current = payformRef.current.createElement(
         "card-expiry",
         {
            style: elementStyles,
            placeholder: "MM/AA",
         },
         "txtFechaVencimiento"
      );

      cardCvcRef.current = payformRef.current.createElement(
         "card-cvc",
         {
            style: elementStyles,
            placeholder: "CVC",
         },
         "txtCvv"
      );
   };

   const formConfiguration = async () => {
      const script = document.createElement("script");
      script.async = true;
      script.src =
         process.env.NODE_ENV === "development"
            ? "https://pocpaymentserve.s3.amazonaws.com/payform.min.js"
            : "https://static-content.vnforapps.com/elements/v1/payform.min.js";
      script.onload = () => {
         const configuration = {
            // callbackurl: "paginaRespuesta",
            sessionkey: sessionKey,
            channel: "web",
            merchantid: merchantId,
            purchasenumber: "2230",
            amount: amount,
            language: "es",
            font: "https://fonts.googleapis.com/css?family=Montserrat:400&display=swap",
            // recurrencemaxamount: "8.5",
         };

         //@ts-ignore
         payformRef.current = payform;

         //@ts-ignore
         payformRef.current.setConfiguration(configuration);
         createForm();
      };

      document.head.appendChild(script);
   };

   const addScriptConfiguration = async () => {
      const promise = new Promise((resolve, reject) => {
         if (payformRef.current) {
            formConfiguration();
         } else {
            formConfiguration();
            resolve("La operación fue exitosa");
         }
      });

      return promise;
   };

   const importFiles = async () => {
      const response = await addScriptConfiguration();
   };

   const securityConfiguration = async () => {
      const token: string = await getAccessToken();
      setAccessToken(token);

      const session = await getSessionToken({
         accessToken: token,
         amount: amount,
         merchantId: merchantId,
      });

      setSessionKey(session.sessionKey);
      setSessionKeyExpirationTime(session.expirationTime);

      setLoading(false);
      setActivePayment(true);
   };

   const pay = async () => {
      const data = {
         name: name,
         lastName: lastName,
         email: email,
         alias: name,
         currencyConversion: true,
      };

      setLoading(true);

      /* Caso de uso: Controles independientes */
      payformRef.current
         .createToken(
            [cardNumberRef.current, cardExpiryRef.current, cardCvcRef.current],
            data
         )
         .then(async function (res: any) {
            /* Tú código aquí */

            try {
               const response = await fetch(
                  process.env.NODE_ENV === "development"
                     ? `https://apisandbox.vnforappstest.com/api.authorization/v3/authorization/ecommerce/${merchantId}`
                     : `https://apiprod.vnforapps.com/api.authorization/v3/authorization/ecommerce/${merchantId}`,
                  {
                     method: "POST",
                     headers: {
                        "Content-Type": "application/json",
                        Authorization: accessToken,
                     },
                     body: JSON.stringify({
                        channel: "web",
                        captureType: "manual",
                        countable: false,
                        order: {
                           tokenId: res.transactionToken,
                           purchaseNumber: "2230",
                           amount: amount,
                           currency: "PEN",
                        },
                     }),
                  }
               );

               const result = await response.json();

               if (response.ok) {
                  try {
                     const booking = await fetch("/api/add-booking", {
                        method: "POST",
                        headers: {
                           "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                           checkIn: dates && dates[dates?.length - 1].checkIn,
                           checkOut: dates && dates[dates?.length - 1].checkOut,
                           name: name,
                           lastname: lastName,
                           email: email,
                           phone: phone,
                           country: country,
                           garage: garage,
                           tours: tours,
                           roomNumber: rooms && rooms[0].roomNumber,
                           id: idRoom,
                        }),
                     });
                  } catch (error) {
                     Swal.fire({
                        title: "Ups! Ocurrió un error",
                        color: "#fff",
                        icon: "error",
                        background: "#101010",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#CB993F",
                     });

                     setLoading(false);
                  }

                  try {
                     const mail = await fetch("/api/send-booking-email", {
                        method: "POST",
                        headers: {
                           "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                           checkIn: dates && dates[dates?.length - 1].checkIn,
                           checkOut: dates && dates[dates?.length - 1].checkOut,
                           email,
                           name,
                           lastName,
                           phone: phone,
                           country: country,
                           garage: garage,
                           tours: tours,
                           roomNumber: rooms && rooms[0].roomNumber,
                           roomName: rooms && rooms[0].name,
                        }),
                     });
                  } catch (error) {
                     Swal.fire({
                        title: "Ups! Ocurrió un error",
                        color: "#fff",
                        icon: "error",
                        background: "#101010",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#CB993F",
                     });
                     setLoading(false);
                  }

                  Swal.fire({
                     title: "Pago realizado con éxito!",
                     text: "Gracias por reservar con nosotros",
                     color: "#fff",
                     icon: "success",
                     background: "#101010",
                     confirmButtonText: "Ok",
                     confirmButtonColor: "#CB993F",
                  });

                  setDateExists(false);

                  for (let i = 0; i < dates.length; i++) {
                     await db.dates.delete(dates[i].id);
                  }

                  for (let i = 0; i < rooms.length; i++) {
                     await db.rooms.delete(rooms[i].id);
                  }

                  setLoading(false);

                  setTimeout(() => {
                     router.refresh();
                     router.push("/pago/gracias");
                  }, 2000);
               } else {
                  setActivePayment(false);
                  Swal.fire({
                     title: `${result.data.ACTION_DESCRIPTION}`,
                     color: "#fff",
                     icon: "error",
                     background: "#101010",
                     confirmButtonText: "Intentar Nuevamente",
                     confirmButtonColor: "#CB993F",
                  }).then((result) => {
                     if (result.isConfirmed) {
                        securityConfiguration();
                     }
                  });
                  setLoading(false);
               }
            } catch (error) {
               console.log(error);

               setLoading(false);
            }
         })
         .catch(function (error: Error) {
            /* Tú código aquí */

            payformRef.current.resetData([cardNumberRef.current]);
            payformRef.current.resetData([cardExpiryRef.current]);
            payformRef.current.resetData([cardCvcRef.current]);

            Swal.fire({
               title: error,
               color: "#fff",
               icon: "error",
               background: "#101010",
               confirmButtonText: "Ok",
               confirmButtonColor: "#CB993F",
            });

            setLoading(false);
         });
   };

   useEffect(() => {
      if (activePayment) {
         importFiles();
      }
   }, [activePayment]);

   useEffect(() => {
      if (activePayment) {
         if (sessionKeyExpirationTime === 1696627100000) {
            Swal.fire({
               title: "La sesión caducó",
               text: "Por favor recarga la página",
               color: "#fff",
               icon: "error",
               background: "#101010",
               confirmButtonText: "Ok",
               confirmButtonColor: "#CB993F",
            });
         }
      }
   }, [new Date()]);

   useEffect(() => {
      if (startSecurityConfiguration) {
         securityConfiguration();
      }
   }, [startSecurityConfiguration]);

   useEffect(() => {
      if (rooms) {
         let totalAdults = 0;
         let totalChildren = 0;
         let totalAmount = 0;
         for (let i = 0; i < rooms.length; i++) {
            totalAdults += rooms[i].adults;
            totalChildren += rooms[i].children;
            totalAmount += rooms[i].price;
         }
         setAdults(totalAdults);
         setChildren(totalChildren);
         setAmount(
            dates &&
               dates[dates.length - 1] &&
               totalAmount *
                  diferenciaEnDias(
                     dates[dates?.length - 1].checkIn,
                     dates[dates?.length - 1].checkOut
                  )
         );

         if (rooms.length !== 0) {
            for (let i = 0; i < availableRooms.length; i++) {
               if (availableRooms[i].roomNumber === rooms[0].roomNumber) {
                  setIdRoom(availableRooms[i].id);
               }
            }
         }
      }
   }, [rooms]);

   useEffect(() => {
      if (rooms) {
         if (rooms.length !== 0) {
            setDateExists(true);
         } else {
            setDateExists(false);
         }
      }
   }, [rooms]);

   return dateExists ? (
      <main>
         <section className="py-40 grid grid-cols-1 lg:grid-cols-4 gap-10 px-8 sm:px-12 md:px-16 lg:px-24">
            <div className="col-span-3 max-w-[600px]">
               <div>
                  <p className="uppercase text-xs tracking-wider font-medium text-zinc-300">
                     Detalles de la Reserva:
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                     <p className="text-lg">
                        Check-in:{" "}
                        <strong>
                           {dates[dates.length - 1] &&
                              dates[dates.length - 1].checkIn.slice(8, 10)}{" "}
                           de{" "}
                           {dates[dates.length - 1] &&
                              calculateMonth(
                                 parseInt(
                                    dates[dates.length - 1].checkIn.slice(5, 7)
                                 )
                              )}
                        </strong>{" "}
                        de{" "}
                        {dates[dates.length - 1] &&
                           dates[dates.length - 1].checkIn.slice(0, 4)}{" "}
                        a partir de 12:00pm (mediodia)
                     </p>
                     <p className="text-lg">
                        Check-out:{" "}
                        <strong>
                           {dates[dates.length - 1] &&
                              dates[dates.length - 1].checkOut.slice(
                                 8,
                                 10
                              )}{" "}
                           de{" "}
                           {dates[dates.length - 1] &&
                              calculateMonth(
                                 parseInt(
                                    dates[dates.length - 1].checkOut.slice(5, 7)
                                 )
                              )}
                        </strong>{" "}
                        de{" "}
                        {dates[dates.length - 1] &&
                           dates[dates.length - 1].checkOut.slice(0, 4)}{" "}
                        - 11:00 am
                     </p>
                  </div>
               </div>

               <div className="mt-16">
                  <div>
                     <div className="flex justify-between border-t border-zinc-800 py-6">
                        <p>Adultos</p>
                        <p>{adults}</p>
                     </div>
                     <div className="flex justify-between border-t border-zinc-800 py-6">
                        <p>Niños</p>
                        <p>{children}</p>
                     </div>
                     <div className="flex justify-between border-t border-zinc-800 py-6">
                        <p>Noches</p>
                        <p>
                           {dates[dates.length - 1] &&
                              diferenciaEnDias(
                                 dates[dates?.length - 1].checkIn,
                                 dates[dates?.length - 1].checkOut
                              )}
                        </p>
                     </div>
                     {rooms &&
                        rooms.map((element: any, i: any) => (
                           <div
                              key={i}
                              className="flex justify-between border-t border-zinc-800 py-6"
                           >
                              <p>{element.name}</p>
                              <p>S/ {element.price}</p>
                           </div>
                        ))}
                     <div className="flex justify-between border-t border-b border-zinc-800 py-6">
                        <p>Total</p>
                        <p>S/ {amount}</p>
                     </div>
                  </div>
               </div>

               <div className="mt-16">
                  <div>
                     <span className="font-bold">Cancelaciones: </span>{" "}
                     <p className="mt-6">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ipsa at veniam ratione nostrum eum animi ut,
                        aspernatur quas. Odit qui adipisci nihil corporis
                        dolorem iste sed aperiam molestiae fuga ad.
                     </p>
                  </div>
               </div>

               <div className="mt-20">
                  <form
                     onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();

                        const formData = new FormData(e.currentTarget);

                        const availableRooms = await getAvailableRooms({
                           checkIn: dates && dates[dates.length - 1].checkIn,
                           checkOut: dates && dates[dates.length - 1].checkOut,
                        });

                        for (let i = 0; i < availableRooms.length; i++) {
                           if (
                              availableRooms[i].roomNumber ===
                              rooms[0].roomNumber
                           ) {
                              pay();
                              return;
                           }
                        }

                        Swal.fire({
                           title: "Al parecer esta habitación ya está reservada",
                           text: "Por favor intenta con otra",
                           color: "#fff",
                           icon: "error",
                           background: "#101010",
                           confirmButtonText: "Ok",
                           confirmButtonColor: "#CB993F",
                        });
                     }}
                     className="mt-10 flex flex-col gap-6"
                     action=""
                  >
                     <div className="">
                        <p className="uppercase text-xs tracking-wider font-medium text-zinc-300">
                           Elegir Servicios Adicionales
                        </p>
                        <ul className="mt-8">
                           <li className="flex gap-3">
                              <input
                                 onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                 ) => {
                                    setGarage(e.currentTarget.checked);
                                 }}
                                 name="garage"
                                 id="garage"
                                 type="checkbox"
                              />
                              <label htmlFor="garage">Cochera (Gratis)</label>
                           </li>
                           <li className="flex gap-3">
                              <input
                                 onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                 ) => {
                                    setTours(e.currentTarget.checked);
                                 }}
                                 name="tours"
                                 id="tours"
                                 type="checkbox"
                              />
                              <label htmlFor="tours">
                                 Tours (Precio previa coordinación)
                              </label>
                           </li>
                        </ul>
                     </div>
                     <p className="uppercase mt-8 text-xs tracking-wider font-medium text-zinc-300">
                        Tu información
                     </p>
                     <div className="flex mt-2 flex-col gap-4">
                        <label htmlFor="name">Nombres:</label>
                        <input
                           required
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setName(e.currentTarget.value);
                           }}
                           name="name"
                           id="name"
                           className="bg-transparent border-b border-zinc-200 rounded-sm h-9 px-3 outline-none"
                           type="text"
                        />
                     </div>

                     <div className="flex flex-col gap-4">
                        <label htmlFor="last-name">Apellidos:</label>
                        <input
                           required
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setLastName(e.currentTarget.value);
                           }}
                           name="last-name"
                           id="last-name"
                           className="bg-transparent border-b border-zinc-200 rounded-sm h-9 px-3 outline-none"
                           type="text"
                        />
                     </div>
                     <div className="flex flex-col gap-4">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input
                           required
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setEmail(e.currentTarget.value);
                           }}
                           name="email"
                           id="email"
                           className="bg-transparent border-b border-zinc-200 rounded-sm h-9 px-3 outline-none"
                           type="email"
                        />
                     </div>
                     <div className="flex flex-col gap-4">
                        <label htmlFor="phone">Teléfono celular:</label>
                        <input
                           required
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setPhone(e.currentTarget.value);
                           }}
                           name="phone"
                           id="phone"
                           className="bg-transparent border-b border-zinc-200 rounded-sm h-9 px-3 outline-none"
                           type="tel"
                        />
                     </div>
                     <div className="flex flex-col gap-4">
                        <label htmlFor="country">País de residencia:</label>
                        <select
                           required
                           onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                              setCountry(e.currentTarget.value);
                           }}
                           className="bg-transparent border-b border-zinc-200 rounded-sm h-9 px-3 outline-none"
                           name="country"
                           id="country"
                        >
                           {countries.map((element, i) => (
                              <option
                                 key={i}
                                 className="bg-zinc-800"
                                 value={`${element.dial_code} ${element.name}`}
                              >
                                 {element.name}
                              </option>
                           ))}
                        </select>
                     </div>

                     {startSecurityConfiguration ? (
                        activePayment ? (
                           <div className="mt-12">
                              <p className="uppercase font-bold text-xs">
                                 Tarjeta de Crédito o Débito
                              </p>

                              <div className="mt-10 max-w-[400px] bg-zinc-900 px-12 pt-10 pb-12 rounded-sm flex flex-col items-center gap-4">
                                 <div
                                    className="py-4 border-b border-zinc-600"
                                    id="txtNumeroTarjeta"
                                 ></div>
                                 <div
                                    className="py-4 border-b border-zinc-600"
                                    id="txtFechaVencimiento"
                                 ></div>
                                 <div
                                    className="py-4 border-b border-zinc-600"
                                    id="txtCvv"
                                 ></div>
                                 <button
                                    disabled={loading}
                                    className="bg-[#CB993F] flex items-center justify-center hover:scale-110 transition-all duration-300 mt-4 w-full max-w-[200px] sm:max-w-[280px] h-10 rounded-full"
                                 >
                                    {loading ? (
                                       <div
                                          className="flex items-center justify-center"
                                          role="status"
                                       >
                                          <svg
                                             aria-hidden="true"
                                             className="w-6 h-6 mr-2 text-white animate-spin dark:text-gray-600 fill-white"
                                             viewBox="0 0 100 101"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                             />
                                             <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                             />
                                          </svg>
                                          <span className="text-white">
                                             Loading...
                                          </span>
                                       </div>
                                    ) : (
                                       <p>Pagar S/ {amount}</p>
                                    )}
                                 </button>
                              </div>
                           </div>
                        ) : (
                           <div></div>
                        )
                     ) : (
                        <button
                           className="bg-[#CB993F] flex items-center justify-center hover:scale-110 transition-all duration-300 my-20 w-full max-w-[200px] sm:max-w-[280px] h-10 rounded-full"
                           onClick={() => {
                              setLoading(true);
                              setStartSecurityConfiguration(true);
                           }}
                        >
                           {loading ? (
                              <div
                                 className="flex items-center justify-center"
                                 role="status"
                              >
                                 <svg
                                    aria-hidden="true"
                                    className="w-6 h-6 mr-2 text-white animate-spin dark:text-gray-600 fill-white"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                       fill="currentColor"
                                    />
                                    <path
                                       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                       fill="currentFill"
                                    />
                                 </svg>
                                 <span className="text-white">Loading...</span>
                              </div>
                           ) : (
                              <p>Reservar</p>
                           )}
                        </button>
                     )}
                  </form>
               </div>
            </div>

            <div className="col-span-1 flex flex-col gap-8 min-w-full">
               <div className="flex flex-col gap-4">
                  <p className="uppercase font-semibold text-sm text-stone-400">
                     Nuestra información
                  </p>
                  <div className="text-base flex flex-col gap-1">
                     <p>Hospedaje &quot;El Rinconcito&quot;</p>
                     <p>Jr. Salaverry 861</p>
                  </div>
               </div>

               <div className="flex flex-col gap-4">
                  <p className="uppercase font-semibold text-sm text-stone-400">
                     Contacto
                  </p>
                  <div className="flex flex-col gap-1">
                     <p>Cel: +51 (935 242 432)</p>
                     <p>Tel: 064 (362866)</p>
                  </div>
               </div>
            </div>
         </section>
      </main>
   ) : (
      <main>
         <div className="py-56 px-20 text-2xl font-medium">
            No escogiste ninguna habitación para tu estadía... Escoge una por
            favor
         </div>
      </main>
   );
}
