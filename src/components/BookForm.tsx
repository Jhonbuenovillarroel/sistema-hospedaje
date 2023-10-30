"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "./Providers";
import AvailableRoom from "./AvailableRoom";
import { db, addDate } from "@/utils/indexeddb-database";
import { useLiveQuery } from "dexie-react-hooks";
import { calculateLaterDate } from "@/app/api/get-available-rooms/route";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";

interface Props {
   className: string;
   alignButton: string;
   addBookingManually?: boolean;
}

export default function BookForm({
   className,
   alignButton,
   addBookingManually,
}: Props) {
   const [loading, setLoading] = useState(false);

   const [adultos, setAdultos] = useState<number[]>([]);
   const [niños, setNiños] = useState<number[]>([]);
   const [checkIn, setCheckIn] = useState<string>("");
   const [checkOut, setCheckOut] = useState<string>("");
   const [invalidDate, setInvalidDate] = useState<boolean>(false);
   const { updateAvailableRooms } = useGlobalContext();

   const router = useRouter();
   const pathname = usePathname();

   const dates: any = useLiveQuery(() => db.dates.toArray());

   const generarArray = (
      cantidad: number,
      funcion: Function,
      index: number
   ) => {
      const newArray: number[] = [];
      for (let i = index; index < cantidad + 1; index++) {
         newArray.push(index);
      }
      funcion(newArray);
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

      updateAvailableRooms(result);
   };

   useEffect(() => {
      generarArray(20, setAdultos, 1);
      generarArray(10, setNiños, 0);
   }, []);

   useEffect(() => {
      if (checkOut) {
         if (
            calculateLaterDate(checkIn, checkOut) === checkIn ||
            calculateLaterDate(checkIn, checkOut) === "son iguales"
         ) {
            setCheckOut(
               `${checkIn.slice(0, 4)}-${checkIn.slice(5, 7)}-${
                  parseInt(checkIn.slice(8, 10)) < 10
                     ? `0${parseInt(checkIn.slice(8, 10)) + 1}`
                     : parseInt(checkIn.slice(8, 10)) + 1
               }`
            );
         }
      }
   }, [checkIn]);
   useEffect(() => {
      if (checkIn) {
         if (
            calculateLaterDate(checkIn, checkOut) === checkIn ||
            calculateLaterDate(checkIn, checkOut) === "son iguales"
         ) {
            setCheckIn(
               `${checkOut.slice(0, 4)}-${checkOut.slice(5, 7)}-${
                  parseInt(checkOut.slice(8, 10)) < 10
                     ? `0${parseInt(checkOut.slice(8, 10)) - 1}`
                     : parseInt(checkOut.slice(8, 10)) - 1
               }`
            );
         }
      }
   }, [checkOut]);

   useEffect(() => {
      if (checkIn) {
         if (
            calculateLaterDate(
               checkIn,
               `${new Date().getFullYear()}-${
                  new Date().getMonth() + 1 < 10
                     ? `0${new Date().getMonth() + 1}`
                     : new Date().getMonth() + 1
               }-${
                  new Date().getDate() < 10
                     ? `0${new Date().getDate()}`
                     : new Date().getDate() - 1
               }`
            ) === "son iguales" ||
            calculateLaterDate(
               checkIn,
               `${new Date().getFullYear()}-${
                  new Date().getMonth() + 1 < 10
                     ? `0${new Date().getMonth() + 1}`
                     : new Date().getMonth() + 1
               }-${
                  new Date().getDate() < 10
                     ? `0${new Date().getDate()}`
                     : new Date().getDate() - 1
               }`
            ) ===
               `${new Date().getFullYear()}-${
                  new Date().getMonth() + 1 < 10
                     ? `0${new Date().getMonth() + 1}`
                     : new Date().getMonth() + 1
               }-${
                  new Date().getDate() < 10
                     ? `0${new Date().getDate()}`
                     : new Date().getDate() - 1
               }`
         ) {
            setInvalidDate(true);
         } else {
            setInvalidDate(false);
         }
      }
   }, [checkIn]);

   return (
      <form
         onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (invalidDate) {
               Swal.fire({
                  title: "Fecha no válida, por favor elige otra",
                  color: "#fff",
                  icon: "error",
                  background: "#101010",
                  confirmButtonText: "Ok",
                  confirmButtonColor: "#CB993F",
               });
               return;
            }
            const formData: any = new FormData(e.currentTarget);

            if (dates.length >= 2) {
               for (let i = 0; i < 1; i++) {
                  if (dates[i].id) {
                     await db.dates.delete(dates[i].id);
                  }
               }
            }

            setLoading(true);

            if (addBookingManually) {
               await addDate(
                  formData.get("check-in"),
                  formData.get("check-out"),
                  "2",
                  "1"
               );
            } else {
               await addDate(
                  formData.get("check-in"),
                  formData.get("check-out"),
                  formData.get("adultos"),
                  formData.get("niños")
               );
            }

            await getAvailableRooms({
               checkIn: formData.get("check-in"),
               checkOut: formData.get("check-out"),
            });

            if (!addBookingManually) {
               router.push("/resultados-de-busqueda");
            }
            setLoading(false);
         }}
         className={className}
      >
         <div className="relative text-white flex flex-col gap-1">
            <label className=" font-medium" htmlFor="check-in">
               Llegada:
            </label>

            <input
               required
               min={`${new Date().getFullYear()}-${
                  new Date().getMonth() + 1 < 10
                     ? `0${new Date().getMonth() + 1}`
                     : new Date().getMonth() + 1
               }-${
                  new Date().getDate() < 10
                     ? `0${new Date().getDate()}`
                     : new Date().getDate()
               }`}
               value={checkIn}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setCheckIn(e.currentTarget.value);
               }}
               id="check-in"
               name="check-in"
               type="date"
               className="calendar-white calendar-pointer border-white w-full outline-none bg-transparent text-sm border-b px-2 h-9"
            />
            {invalidDate && (
               <p className="text-red-400 mt-1 sticky bottom-[-32px] transition-all duration-300">
                  Fecha no válida
               </p>
            )}
         </div>
         <div className="flex text-white relative flex-col gap-1">
            <label className=" font-medium" htmlFor="check-out">
               Salida:
            </label>
            <input
               required
               value={checkOut}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setCheckOut(e.currentTarget.value);
               }}
               min={`${new Date().getFullYear()}-${
                  new Date().getMonth() + 1 < 10
                     ? `0${new Date().getMonth() + 1}`
                     : new Date().getMonth() + 1
               }-${
                  new Date().getDate() < 10
                     ? `0${new Date().getDate()}`
                     : new Date().getDate()
               }`}
               id="check-out"
               name="check-out"
               type="date"
               className="calendar-white calendar-pointer border-white w-full outline-none bg-transparent text-sm border-b px-2 h-9"
            />
            {invalidDate && (
               <p className="text-red-400 sticky bottom-[-32px] mt-1 transition-all duration-300">
                  Fecha no válida
               </p>
            )}
         </div>
         {!addBookingManually && (
            <div className="grid text-white grid-cols-2 gap-4 sm:col-span-2">
               <div className="flex flex-col gap-1">
                  <label className=" font-medium" htmlFor="adultos">
                     Adultos:
                  </label>
                  <select
                     className="outline-none cursor-pointer border-white bg-transparent text-sm border px-2 h-9"
                     name="adultos"
                     id="adultos"
                  >
                     {adultos.map((elemento, i) => (
                        <option
                           key={i}
                           className="bg-white cursor-pointer dark:bg-black"
                           value={elemento}
                        >
                           {elemento}
                        </option>
                     ))}
                  </select>
               </div>
               <div className="flex flex-col gap-1">
                  <label className=" font-medium" htmlFor="niños">
                     Niños:
                  </label>
                  <select
                     className="outline-none cursor-pointer border-white bg-transparent text-sm border px-2 h-9"
                     name="niños"
                     id="niños"
                  >
                     {niños.map((elemento, i) => (
                        <option
                           key={i}
                           className="bg-white cursor-pointer dark:bg-black"
                           value={elemento}
                        >
                           {elemento}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
         )}
         <button
            disabled={loading}
            onClick={() => {
               if (invalidDate) {
                  Swal.fire({
                     title: "Fecha no válida, por favor elige otra",
                     color: "#fff",
                     icon: "error",
                     background: "#101010",
                     confirmButtonText: "Ok",
                     confirmButtonColor: "#CB993F",
                  });
                  return;
               }
            }}
            className={`bg-[#CB993F] text-white ${alignButton} uppercase text-xs font-medium tracking-widest h-9 mt-4`}
         >
            {loading ? (
               <div className="flex items-center justify-center" role="status">
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
               <p>Verificar disponibilidad</p>
            )}
         </button>
      </form>
   );
}
