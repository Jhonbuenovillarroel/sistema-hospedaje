"use client";

import { useEffect, useState } from "react";
import { BsCalendar2Plus } from "react-icons/bs";
import { calculateMonth } from "@/utils/functions";
import BookingDetailsPopup from "@/components/BookingDetailsPopup";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdOutlineEditNote } from "react-icons/md";
import Swal from "sweetalert2";
import BookingForm from "@/components/BookingForm";
import { db } from "@/utils/indexeddb-database";
import { useLiveQuery } from "dexie-react-hooks";

export interface Booking {
   checkIn: string;
   checkOut: string;
   country: string;
   email: string;
   garage: boolean;
   id: string;
   lastname: string;
   name: string;
   phone: string;
   roomId: string;
   roomNumber: number;
   tours: boolean;
   roomPrice: number;
   roomName: string;
}

export default function Reservas() {
   const [bookings, setBookings] = useState([]);
   const [addBooking, setAddBooking] = useState<boolean>(false);
   const [showBookingDetailsPopup, setShowBookingDetailsPopup] =
      useState<boolean>(false);
   const [currentRoomId, setCurrentRoomId] = useState<string>("");
   const [currentBooking, setCurrentBooking] = useState<Booking>({
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
   const [popupTransform, setPopupTransform] = useState<string>(
      "w-60 h-60 opacity-0"
   );
   const [edit, setEdit] = useState<boolean>(false);

   const dates: any = useLiveQuery(() => db.dates.toArray());

   const obtenerReservas = async () => {
      const response = await fetch("/api/get-bookings");

      const result = await response.json();

      setBookings(result);
   };

   const deleteBooking = async (id: string) => {
      const response = await fetch("/api/delete-booking", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            id,
         }),
      });

      const result = await response.json();

      if (result.error) {
         Swal.fire({
            title: result.error,
            icon: "error",
            color: "#fff",
            background: "#101010",
            confirmButtonColor: "CB993F",
         });
      } else if (result.booking) {
         Swal.fire({
            title: "Reserva eliminada correctamente",
            color: "#fff",
            background: "#101010",
            confirmButtonColor: "#CB993F",
            icon: "success",
         });
      }
   };

   useEffect(() => {
      obtenerReservas();
   }, []);

   return (
      <>
         <section className="px-8 pt-24 pb-12 flex flex-col items-center justify-start w-full">
            {addBooking ? (
               <BookingForm
                  currentBooking={currentBooking}
                  setCurrentBooking={setCurrentBooking}
                  edit={edit}
                  setAddBooking={setAddBooking}
               />
            ) : (
               <>
                  <div>
                     <button
                        onClick={async () => {
                           for (let i = 0; i < dates.length; i++) {
                              await db.dates.delete(dates[i].id);
                           }
                           setAddBooking(true);
                           setEdit(false);
                        }}
                        className="flex items-center justify-center gap-3 rounded-full h-14 px-6 text-white bg-zinc-800"
                     >
                        Agregar Reserva Manualmente{" "}
                        <BsCalendar2Plus className="w-5 h-5" />
                     </button>
                  </div>
                  <div className="mt-8">
                     <div className="max-w-[800px] text-center bg-[rgb(168,167,82)] rounded-tr-md rounded-tl-md py-4 px-6 gap-4 grid grid-cols-4 sm:grid-cols-5 items-center justify-items-center">
                        <p className="hidden sm:flex">Nombres y Apellidos</p>
                        <p className="col-span-2 sm:col-span-1">
                           N° de habitación
                        </p>
                        <p className="hidden sm:flex">Check-in</p>
                        <p className="hidden sm:flex">Check-out</p>
                        <p className="col-span-2 sm:col-span-1">Opciones</p>
                     </div>

                     {bookings.length !== 0 ? (
                        bookings.map((booking: Booking, i) => (
                           <div key={i}>
                              {showBookingDetailsPopup &&
                                 booking.roomId === currentRoomId && (
                                    <BookingDetailsPopup
                                       popupTransform={popupTransform}
                                       setPopupTransform={setPopupTransform}
                                       setShowBookingDetailsPopup={
                                          setShowBookingDetailsPopup
                                       }
                                       roomId={booking.roomId}
                                       name={booking.name}
                                       lastname={booking.lastname}
                                       roomNumber={booking.roomNumber}
                                       checkIn={booking.checkIn}
                                       checkOut={booking.checkOut}
                                       email={booking.email}
                                       phone={booking.phone}
                                       country={booking.country}
                                       garage={booking.garage}
                                       tours={booking.tours}
                                       booking={booking}
                                       deleteBooking={deleteBooking}
                                       setEdit={setEdit}
                                       setAddBooking={setAddBooking}
                                       setCurrentBooking={setCurrentBooking}
                                    />
                                 )}

                              <div className="max-w-[800px] text-center px-6 gap-4 py-8 grid grid-cols-4 sm:grid-cols-5 border-b border-b-zinc-800 items-center justify-center">
                                 <p className="hidden sm:flex sm:items-center sm:justify-center">{`${booking.name} ${booking.lastname}`}</p>
                                 <p className="col-span-2 sm:col-span-1">
                                    {booking.roomNumber}
                                 </p>
                                 <p className="hidden sm:flex">
                                    {booking.checkIn.slice(8, 10)} de{" "}
                                    {calculateMonth(
                                       parseInt(booking.checkIn.slice(5, 7))
                                    )}{" "}
                                    de {booking.checkIn.slice(0, 4)}{" "}
                                 </p>
                                 <p className="hidden sm:flex">
                                    {booking.checkOut.slice(8, 10)} de{" "}
                                    {calculateMonth(
                                       parseInt(booking.checkOut.slice(5, 7))
                                    )}{" "}
                                    de {booking.checkOut.slice(0, 4)}{" "}
                                 </p>

                                 <div className="col-span-2 sm:col-span-1 flex w-full gap-0 items-center justify-center">
                                    <div
                                       onClick={async () => {
                                          Swal.fire({
                                             title: "Estás seguro de que quieres eliminar esta reserva?",
                                             icon: "question",
                                             text: "Esta acción es irreversible",
                                             color: "#fff",
                                             background: "#101010",
                                             confirmButtonColor: "#CB993F",
                                             confirmButtonText:
                                                "Si, estoy seguro(a)",
                                             showDenyButton: true,
                                             denyButtonColor: "#202020",
                                             denyButtonText: "No, Cancelar",
                                          }).then(async (result) => {
                                             if (result.isConfirmed) {
                                                const response =
                                                   await deleteBooking(
                                                      booking.id
                                                   );
                                             } else {
                                             }
                                          });
                                       }}
                                       title="Eliminar"
                                       className="hidden sm:flex hover:bg-zinc-900 rounded-full p-3 cursor-pointer"
                                    >
                                       <MdDelete className="w-6 h-6 change-background-to-red" />
                                    </div>
                                    <div
                                       onClick={async () => {
                                          for (
                                             let i = 0;
                                             i < dates.length;
                                             i++
                                          ) {
                                             await db.dates.delete(dates[i].id);
                                          }
                                          setEdit(true);
                                          setAddBooking(true);
                                          setCurrentBooking(booking);
                                       }}
                                       title="Editar"
                                       className="hidden sm:flex hover:bg-zinc-900 rounded-full p-3 cursor-pointer"
                                    >
                                       <MdOutlineEditNote className="w-7 h-7 change-background-to-yellow" />
                                    </div>
                                    <div className="flex col-span-2 items-center justify-center w-full">
                                       <div
                                          onClick={() => {
                                             setCurrentRoomId(booking.roomId);
                                             setShowBookingDetailsPopup(true);
                                          }}
                                          className="hover:bg-zinc-800 rounded-full p-3 cursor-pointer"
                                       >
                                          <BsThreeDotsVertical className="" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <p className="text-center mt-8">No hay reservas aún</p>
                     )}
                  </div>
               </>
            )}
         </section>
      </>
   );
}
