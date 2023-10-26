import React, { useEffect } from "react";
import { FormEvent } from "react";
import { useState, ChangeEvent } from "react";
import countries from "@/utils/countries.json";
import BookForm from "./BookForm";
import { useGlobalContext } from "./Providers";
import { calculateMonth } from "@/utils/functions";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/indexeddb-database";
import Gallery from "./Gallery";
import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Booking } from "@/app/panel-administracion/reservas/page";

interface Props {
   setAddBooking: Function;
   edit: boolean;
   currentBooking: Booking;
   setCurrentBooking: Function;
}

const BookingForm = ({
   setAddBooking,
   edit,
   currentBooking,
   setCurrentBooking,
}: Props) => {
   const { availableRooms, updateAvailableRooms } = useGlobalContext();

   const dates: any = useLiveQuery(() => db.dates.toArray());

   const [checkIn, setCheckIn] = useState<string>(currentBooking.checkIn);
   const [checkOut, setcheckOut] = useState<string>(currentBooking.checkOut);
   const [loading, setLoading] = useState<boolean>(false);

   const [selectedRoomId, setSelectedRoomId] = useState<string>("");
   const [name, setName] = useState<string>();
   const [lastName, setLastName] = useState<string>();
   const [email, setEmail] = useState<string>();
   const [phone, setPhone] = useState<string>();
   const [country, setCountry] = useState<string>();
   const [garage, setGarage] = useState<boolean>(false);
   const [tours, setTours] = useState<boolean>(false);
   const [roomNumber, setRoomNumber] = useState<number>();
   const [bookingId, setBookingId] = useState<string>(currentBooking.id);

   const addOrEditBooking = async () => {
      const response = await fetch(
         edit ? "/api/edit-booking" : "/api/add-booking",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               id: bookingId,
               checkIn: checkIn,
               checkOut: checkOut,
               name: name,
               lastname: lastName,
               email: email ? email : "",
               phone: phone ? phone : "",
               country: country,
               garage: garage,
               tours: tours,
               roomNumber: roomNumber,
               roomId: selectedRoomId,
            }),
         }
      );

      if (response.ok) {
         toast.success(
            edit
               ? "Reserva actualizada correctamente"
               : "Reserva creada correctamente",
            {
               style: {
                  color: "#000",
               },
            }
         );
         setTimeout(() => {
            setAddBooking(false);
            setLoading(false);
         }, 2000);
      } else {
         const result = await response.json();
         if (result.error) {
            toast.error(result.error, {
               style: {
                  background: "#CF3434",
               },
               iconTheme: {
                  primary: "#CA5353",
                  secondary: "#fff",
               },
            });
            setTimeout(() => {
               setLoading(false);
            }, 2000);
         }
      }
   };

   useEffect(() => {
      if (edit) {
         setSelectedRoomId(currentBooking.roomId);
         setName(currentBooking.name);
         setLastName(currentBooking.lastname);
         setEmail(currentBooking.email);
         setPhone(currentBooking.phone);
         setCountry(currentBooking.country);
         setGarage(currentBooking.garage);
         setTours(currentBooking.tours);
         setRoomNumber(currentBooking.roomNumber);
      }
   }, []);

   useEffect(() => {
      if (dates && dates.length !== 0) {
         setCheckIn(dates[dates.length - 1].checkIn);
         setcheckOut(dates[dates.length - 1].checkOut);
      }
   }, [dates]);

   return (
      <>
         <BookForm
            addBookingManually={true}
            className="w-full flex flex-col gap-4 max-w-[400px] lg:max-w-[300px]"
            alignButton=""
         />
         <div className="flex justify-center mt-20">
            <div className=" w-full flex flex-col items-start">
               {availableRooms.length !== 0 ? (
                  <>
                     <p className="text-xl font-medium max-w-[600px] text-center">
                        {availableRooms.length} habitaciones encontradas desde
                        el{" "}
                        {dates && dates[dates.length - 1].checkIn.slice(8, 10)}{" "}
                        de{" "}
                        {dates &&
                           calculateMonth(
                              parseInt(
                                 dates[dates.length - 1].checkIn.slice(5, 7)
                              )
                           )}{" "}
                        de{" "}
                        {dates && dates[dates.length - 1].checkIn.slice(0, 4)} -
                        hasta el{" "}
                        {dates && dates[dates.length - 1].checkOut.slice(8, 10)}{" "}
                        de{" "}
                        {dates &&
                           calculateMonth(
                              parseInt(
                                 dates[dates.length - 1].checkOut.slice(5, 7)
                              )
                           )}{" "}
                        de{" "}
                        {dates && dates[dates.length - 1].checkOut.slice(0, 4)}
                     </p>
                     <hr className="border-none h-px bg-zinc-800 mt-12 w-full" />
                     {availableRooms.map((room, i) => (
                        <div
                           key={i}
                           className="max-w-[600px] flex justify-center py-5 border-b border-b-zinc-800"
                        >
                           <div className="grid w-full grid-cols-12 gap-4 items-center justify-items-center text-center">
                              <p className="col-span-3 lg:col-span-2">
                                 {room.name}
                              </p>
                              <p className="col-span-3 lg:col-span-2">
                                 {room.roomNumber}
                              </p>
                              <div className="col-span-6 lg:col-span-5">
                                 <Gallery
                                    width="max-w-[200px]"
                                    sizeArrow="6"
                                    displacement={320}
                                 >
                                    {room.images &&
                                       room.images.map((urlImage, i) => (
                                          <Image
                                             key={i}
                                             className="h-full w-full snap-center object-cover"
                                             src={urlImage}
                                             width={350}
                                             height={350}
                                             alt={room.name}
                                          />
                                       ))}
                                 </Gallery>
                              </div>
                              {selectedRoomId === room.id ? (
                                 <button
                                    disabled
                                    type="button"
                                    className="bg-zinc-800 mt-2 lg:mt-0 col-span-12 lg:col-span-3 flex gap-2 items-center justify-center hover:scale-110 transition-all duration-300 w-full max-w-[200px] sm:max-w-[280px] h-auto py-2 px-3 rounded-full"
                                 >
                                    <AiOutlineCheck />
                                    <p>Seleccionado</p>
                                 </button>
                              ) : (
                                 <button
                                    type="button"
                                    className="bg-[#CB993F] mt-2 lg:mt-0 col-span-12 lg:col-span-3 flex items-center justify-center hover:scale-110 transition-all duration-300 w-full max-w-[200px] sm:max-w-[280px] h-auto py-2 px-3 rounded-full"
                                    onClick={() => {
                                       setRoomNumber(room.roomNumber);
                                       setSelectedRoomId(room.id);
                                       setCurrentBooking({
                                          ...currentBooking,
                                          roomName: room.name,
                                          roomNumber: room.roomNumber,
                                          roomPrice: room.price,
                                       });
                                    }}
                                 >
                                    Seleccionar
                                 </button>
                              )}
                           </div>
                        </div>
                     ))}
                  </>
               ) : (
                  <div>
                     <p>
                        Todas las habitaciones están reservadas para esta
                        fecha... Por Favor realiza otra búsqueda
                     </p>
                  </div>
               )}
            </div>
         </div>

         <form
            onSubmit={async (e: FormEvent<HTMLFormElement>) => {
               e.preventDefault();

               if (!selectedRoomId) {
                  toast.error("No seleccionaste ninguna habitación", {
                     style: {
                        background: "#CF3434",
                     },
                     iconTheme: {
                        primary: "#CA5353",
                        secondary: "#fff",
                     },
                  });
                  return;
               }

               setLoading(true);

               await addOrEditBooking();
            }}
            className="mt-10 max-w-[360px] sm:max-w-[600px] w-full flex flex-col gap-6"
            action=""
         >
            {edit && (
               <div className="flex flex-col gap-3 mt-8 text-center">
                  <div className="flex flex-col gap-1">
                     <p className="text-lg font-bold">Check-In:</p>
                     <p>
                        {checkIn.slice(8, 10)} de{" "}
                        {dates && calculateMonth(parseInt(checkIn.slice(5, 7)))}{" "}
                        de {checkIn.slice(0, 4)}
                     </p>
                  </div>

                  <div className="flex flex-col gap-1">
                     <p className="text-lg font-bold">Check-Out:</p>
                     <p>
                        {checkOut.slice(8, 10)} de{" "}
                        {dates &&
                           calculateMonth(parseInt(checkOut.slice(5, 7)))}{" "}
                        de {checkOut.slice(0, 4)}
                     </p>
                  </div>

                  <div className="flex flex-col gap-1">
                     <p className="text-lg font-bold">Habitación:</p>
                     <p>
                        {currentBooking.roomName} - {currentBooking.roomNumber}
                     </p>
                  </div>

                  <div className="flex flex-col gap-1">
                     <p className="text-lg font-bold">Precio:</p>
                     <p>{currentBooking.roomPrice}</p>
                  </div>
               </div>
            )}

            <div className="">
               <p className="uppercase text-xs mt-12 tracking-wider font-medium text-zinc-300">
                  Elegir Servicios Adicionales
               </p>
               <ul className="mt-8">
                  <li className="flex gap-3">
                     <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setGarage(e.currentTarget.checked);
                           setCurrentBooking({
                              ...currentBooking,
                              garage: e.currentTarget.checked,
                           });
                        }}
                        checked={currentBooking.garage}
                        name="garage"
                        id="garage"
                        type="checkbox"
                     />
                     <label htmlFor="garage">Cochera (Gratis)</label>
                  </li>
                  <li className="flex gap-3">
                     <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setTours(e.currentTarget.checked);
                           setCurrentBooking({
                              ...currentBooking,
                              tours: e.currentTarget.checked,
                           });
                        }}
                        checked={currentBooking.tours}
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
                     setCurrentBooking({
                        ...currentBooking,
                        name: e.currentTarget.value,
                     });
                  }}
                  value={currentBooking.name}
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
                     setCurrentBooking({
                        ...currentBooking,
                        lastname: e.currentTarget.value,
                     });
                  }}
                  value={currentBooking.lastname}
                  name="last-name"
                  id="last-name"
                  className="bg-transparent border-b border-zinc-200 rounded-sm h-9 px-3 outline-none"
                  type="text"
               />
            </div>
            <div className="flex flex-col gap-4">
               <label htmlFor="email">Correo Electrónico:</label>
               <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                     setEmail(e.currentTarget.value);
                     setCurrentBooking({
                        ...currentBooking,
                        email: e.currentTarget.value,
                     });
                  }}
                  value={currentBooking.email}
                  name="email"
                  id="email"
                  className="bg-transparent border-b border-zinc-200 rounded-sm h-9 px-3 outline-none"
                  type="email"
               />
            </div>
            <div className="flex flex-col gap-4">
               <label htmlFor="phone">Teléfono celular:</label>
               <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                     setPhone(e.currentTarget.value);
                     setCurrentBooking({
                        ...currentBooking,
                        phone: e.currentTarget.value,
                     });
                  }}
                  value={currentBooking.phone}
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
                     setCurrentBooking({
                        ...currentBooking,
                        country: e.currentTarget.value,
                     });
                  }}
                  value={currentBooking.country}
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

            <div className="flex flex-col items-center gap-6">
               <button
                  disabled={loading}
                  className="bg-[#CB993F] flex items-center justify-center hover:scale-110 transition-all duration-300 mt-12 w-full max-w-[300px] sm:max-w-[320px] h-10 rounded-full"
                  onClick={() => {}}
               >
                  {loading && loading ? (
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
                  ) : edit ? (
                     <p>Guardar Cambios</p>
                  ) : (
                     <p>Agregar Reserva</p>
                  )}
               </button>
               <button
                  type="button"
                  className="bg-zinc-800 flex items-center justify-center hover:scale-110 transition-all duration-300 w-full max-w-[300px] sm:max-w-[320px] h-10 rounded-full"
                  onClick={() => {
                     setAddBooking(false);
                     setCurrentBooking({
                        checkIn: "",
                        checkOut: "",
                        country: "",
                        email: "",
                        garage: false,
                        id: "",
                        lastname: "",
                        name: "",
                        phone: "",
                        roomId: "",
                        roomNumber: 0,
                        tours: false,
                        roomPrice: 0,
                        roomName: "",
                     });
                     updateAvailableRooms([]);
                  }}
               >
                  Cancelar
               </button>
            </div>
         </form>
      </>
   );
};

export default BookingForm;
