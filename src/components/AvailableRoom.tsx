"use client";

import Gallery from "./Gallery";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Rooms, addRoom, db } from "@/utils/indexeddb-database";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";

interface Props {
   name: string;
   description: string;
   adults: number;
   roomNumber: number;
   childrens: number;
   view: string;
   bed: string;
   category: string;
   price: number;
   amenities: string[];
   images: string[];
}

export default function AvailableRoom({
   name,
   description,
   adults,
   roomNumber,
   childrens,
   view,
   bed,
   category,
   price,
   amenities,
   images,
}: Props) {
   const router = useRouter();
   const rooms: any = useLiveQuery(() => db.rooms.toArray());
   let room: any;

   useEffect(() => {
      if (rooms) {
         for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].roomNumber === roomNumber) {
               room = rooms[i];
            }
         }
      }
   }, [rooms]);

   return (
      <div>
         <div className="w-full">
            <div className="relative w-full">
               <Gallery displacement={320}>
                  {images &&
                     images.map((element, i) => (
                        <Image
                           key={i}
                           className="h-full w-full  snap-center object-cover"
                           src={
                              element
                                 ? element
                                 : "/fotos__hospedaje/default-image-room.png"
                           }
                           width={350}
                           height={350}
                           alt={name}
                        />
                     ))}
               </Gallery>
            </div>
            <div>
               <div className="mt-8">
                  <p className="text-2xl font-bold">{name}</p>
                  <p className="mt-4">{description}</p>
               </div>
               <div className="mt-8">
                  <ul className="flex flex-col gap-3">
                     <li className="flex gap-2 items-center">
                        <MdKeyboardArrowRight /> Adultos: {adults}
                     </li>
                     <li className="flex gap-2 items-center">
                        <MdKeyboardArrowRight /> Niños: {childrens}
                     </li>
                     <li className="flex flex-wrap gap-2 items-center">
                        <MdKeyboardArrowRight /> Comodidades:{" "}
                        {amenities &&
                           amenities.map((element, i) =>
                              i === amenities.length - 1 ? (
                                 <span key={i}>{element}</span>
                              ) : (
                                 <span key={i}>{element + ", "}</span>
                              )
                           )}
                     </li>
                     <li className="flex gap-2 items-center">
                        <MdKeyboardArrowRight /> Vista: {view}
                     </li>
                     <li className="flex gap-2 items-center">
                        <MdKeyboardArrowRight /> Cama: {bed}
                     </li>
                     <li className="flex gap-2 items-center">
                        <MdKeyboardArrowRight /> Categoría: {category}
                     </li>
                  </ul>
               </div>
               <div className="mt-8">
                  <p className="font-bold">Precio:</p>
                  <p className="text-4xl font-bold mt-4">S/ {price}</p>
               </div>
            </div>
            <hr className="my-8 border border-zinc-800" />
            <div className="flex items-center justify-between gap-4">
               <div className="flex items-center justify-center">
                  <button
                     onClick={async () => {
                        if (rooms) {
                           for (let i = 0; i < rooms.length; i++) {
                              await db.rooms.delete(rooms[i].id);
                           }
                        }
                        addRoom(
                           name,
                           price,
                           images,
                           true,
                           roomNumber,
                           adults,
                           childrens
                        );
                        router.push("/pago");
                     }}
                     className="bg-[#CB993F] flex items-center justify-center w-64 h-12 rounded-full"
                  >
                     Reservar
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
