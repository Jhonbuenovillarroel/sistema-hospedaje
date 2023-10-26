"use client";

import React from "react";

import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Booking } from "@/app/panel-administracion/reservas/page";
import Swal from "sweetalert2";
import { MdDelete, MdOutlineEditNote } from "react-icons/md";
import { db } from "@/utils/indexeddb-database";
import { useLiveQuery } from "dexie-react-hooks";
import { calculateMonth } from "@/utils/functions";

interface Props {
   name: string;
   lastname: string;
   roomNumber: number;
   checkIn: string;
   checkOut: string;
   roomId: string;
   popupTransform: string;
   setShowBookingDetailsPopup: Function;
   setPopupTransform: Function;
   email: string;
   phone: string;
   country: string;
   garage: boolean;
   tours: boolean;
   booking: Booking;
   deleteBooking: Function;
   setEdit: Function;
   setAddBooking: Function;
   setCurrentBooking: Function;
}

const BookingDetailsPopup = ({
   name,
   lastname,
   roomNumber,
   checkIn,
   checkOut,
   roomId,
   setShowBookingDetailsPopup,
   setPopupTransform,
   popupTransform,
   email,
   phone,
   country,
   garage,
   tours,
   booking,
   deleteBooking,
   setEdit,
   setAddBooking,
   setCurrentBooking,
}: Props) => {
   const dates: any = useLiveQuery(() => db.dates.toArray());

   useEffect(() => {
      setPopupTransform("w-full h-full opacity-100");
   }, []);

   return (
      <div
         className={`max-w-[600px] overflow-y-scroll custom-scroll-bar z-10 ${popupTransform} transition-all duration-300 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center px-6 gap-6 py-8 flex flex-col bg-zinc-950 items-center border-b border-b-zinc-800`}
      >
         <AiOutlineClose
            onClick={() => {
               setPopupTransform("w-60 h-60 opacity-0");
               setTimeout(() => {
                  setShowBookingDetailsPopup(false);
               }, 100);
            }}
            className="absolute w-6 h-6 top-5 cursor-pointer right-5"
         />
         <div className="flex flex-col gap-1">
            <p className="font-bold">Nombres y Apellidos:</p>
            <p>{`${name} ${lastname}`}</p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold">N° de Habitación:</p>
            <p>{roomNumber}</p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold">Check-In:</p>
            <p>
               {checkIn.slice(8, 10)} de{" "}
               {calculateMonth(parseInt(checkIn.slice(5, 7)))} de{" "}
               {checkIn.slice(0, 4)}{" "}
            </p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold">Check-Out:</p>
            <p>
               {checkOut.slice(8, 10)} de{" "}
               {calculateMonth(parseInt(checkOut.slice(5, 7)))} de{" "}
               {checkOut.slice(0, 4)}{" "}
            </p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold">Correo Electrónico:</p>
            <p>{email}</p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold">Teléfono:</p>
            <p>{phone}</p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold">País:</p>
            <p>{country}</p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold">Cochera:</p>
            <p>{garage ? "Si" : "No"}</p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold">Tours:</p>
            <p>{tours ? "Si" : "No"}</p>
         </div>

         <div className="flex mt-4">
            <div
               onClick={async () => {
                  Swal.fire({
                     title: "Estás seguro de que quieres eliminar esta reserva?",
                     icon: "question",
                     text: "Esta acción es irreversible",
                     color: "#fff",
                     background: "#101010",
                     confirmButtonColor: "#CB993F",
                     confirmButtonText: "Si, estoy seguro(a)",
                     showDenyButton: true,
                     denyButtonColor: "#202020",
                     denyButtonText: "No, Cancelar",
                  }).then(async (result) => {
                     if (result.isConfirmed) {
                        const response = await deleteBooking(booking.id);
                     } else {
                     }
                  });
               }}
               title="Eliminar"
               className="flex hover:bg-zinc-900 rounded-full p-3 cursor-pointer"
            >
               <MdDelete className="w-6 h-6 change-background-to-red" />
            </div>
            <div
               onClick={async () => {
                  for (let i = 0; i < dates.length; i++) {
                     await db.dates.delete(dates[i].id);
                  }
                  setEdit(true);
                  setAddBooking(true);
                  setCurrentBooking(booking);
               }}
               title="Editar"
               className="flex hover:bg-zinc-900 rounded-full p-3 cursor-pointer"
            >
               <MdOutlineEditNote className="w-7 h-7 change-background-to-yellow" />
            </div>
         </div>
      </div>
   );
};

export default BookingDetailsPopup;
