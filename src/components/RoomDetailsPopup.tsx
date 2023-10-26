"use client";

import Gallery from "@/components/Gallery";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from "sweetalert2";
import { MdDelete, MdOutlineEditNote } from "react-icons/md";
import { Room } from "@/app/panel-administracion/habitaciones/page";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
   name: string;
   roomNumber: number;
   price: number;
   images: string[];
   id: string;
   popupTransform: string;
   deleteRoom: Function;
   setAddRoom: Function;
   setEdit: Function;
   setPopupTransform: Function;
   setCurrentRoom: Function;
   setShowRoomDetailsPopup: Function;
   room: Room;
}

const RoomDetailsPopup = ({
   name,
   roomNumber,
   price,
   id,
   images,
   popupTransform,
   deleteRoom,
   setAddRoom,
   setEdit,
   setCurrentRoom,
   setShowRoomDetailsPopup,
   setPopupTransform,
   room,
}: Props) => {
   useEffect(() => {
      setPopupTransform("w-full h-full opacity-100");
   }, []);

   return (
      <div
         className={`max-w-[700px] overflow-hidden transition-all duration-300 text-center gap-4 py-8 rounded-lg fixed ${popupTransform} top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-zinc-950 px-6 flex flex-col border-b border-b-zinc-800 items-center justify-center`}
      >
         <AiOutlineClose
            onClick={() => {
               setPopupTransform("w-60 h-60 opacity-0");
               setTimeout(() => {
                  setShowRoomDetailsPopup(false);
               }, 100);
            }}
            className="absolute w-6 h-6 top-5 right-5"
         />
         <div className="flex flex-col gap-1">
            <p className="font-bold">Nombre:</p>
            <p className="col-span-5 lg:col-span-2">{name}</p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold">N° de Habitación:</p>
            <p className="lg:col-span-1">{roomNumber}</p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold">Precio:</p>
            <p className="lg:col-span-1">{price}</p>
         </div>
         <div className="lg:col-span-3  lg:flex justify-center items-center">
            <Gallery width="max-w-[220px]" sizeArrow="4" displacement={320}>
               {images &&
                  images.map((urlImage: string, i: number) => (
                     <Image
                        key={i}
                        className="h-fit w-full snap-center object-cover"
                        src={urlImage}
                        width={350}
                        height={350}
                        alt={name}
                     />
                  ))}
            </Gallery>
         </div>
         <div className="flex w-full gap-0 items-center justify-center">
            <div
               onClick={async () => {
                  Swal.fire({
                     title: "Estás seguro de que deseas eliminar esta habitación?",
                     color: "#fff",
                     icon: "question",
                     background: "#101010",
                     confirmButtonText: "Si, seguro",
                     confirmButtonColor: "#CB993F",
                     denyButtonText: "No, cancelar",
                     showDenyButton: true,
                  }).then(async (result) => {
                     if (result.isConfirmed) {
                        const responseBookings = await fetch(
                           "/api/get-room-bookings",
                           {
                              method: "POST",
                              headers: {
                                 "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                 id: id,
                              }),
                           }
                        );

                        const result = await responseBookings.json();

                        if (result.bookings) {
                           Swal.fire({
                              title: "Hay huéspedes que ya reservaron esta habitación",
                              text: "Estás seguro de que deseas eliminarla? Se eliminará la habitación y todas sus reservas",
                              color: "#fff",
                              icon: "question",
                              background: "#101010",
                              confirmButtonText: "Si, seguro",
                              confirmButtonColor: "#CB993F",
                              denyButtonText: "No, cancelar",
                              showDenyButton: true,
                           }).then(async (result) => {
                              if (result.isConfirmed) {
                                 await deleteRoom(id, images);
                              }
                           });
                        } else {
                           await deleteRoom(id, images);
                        }
                     } else if (result.isDenied) {
                     }
                  });
               }}
               title="Eliminar"
               className="hover:bg-zinc-900 rounded-full p-3 cursor-pointer"
            >
               <MdDelete className="w-6 h-6 change-background-to-red" />
            </div>
            <div
               onClick={() => {
                  setAddRoom(true);
                  setEdit(true);
                  setCurrentRoom(room);
               }}
               title="Editar"
               className="hover:bg-zinc-900 rounded-full p-3 cursor-pointer"
            >
               <MdOutlineEditNote className="w-7 h-7 change-background-to-yellow" />
            </div>
         </div>
      </div>
   );
};

export default RoomDetailsPopup;
