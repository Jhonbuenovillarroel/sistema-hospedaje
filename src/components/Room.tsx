"use client";

import Image from "next/image";
import Gallery from "./Gallery";
import Link from "next/link";

type Images = string[];
type Characteristics = string[];

interface Props {
   images: Images;
   name: string;
   price: number;
   characteristics: Characteristics;
   href: string;
}

export default function Room({
   images,
   name,
   price,
   characteristics,
   href,
}: Props) {
   return (
      <div className="bg-zinc-900 pb-12 md:grid md:grid-cols-8 xl:grid-cols-9 md:pb-0">
         <div className="relative col-span-4 lg:col-span-5 xl:col-span-6 order-2 h-full w-full">
            <Gallery displacement={240}>
               {images &&
                  images.map((element, i) => (
                     <Image
                        key={i}
                        className="h-full object-cover snap-center w-full"
                        src={
                           element
                              ? element
                              : "/fotos__hospedaje/default-image-room.png"
                        }
                        width={800}
                        height={800}
                        alt={name}
                     />
                  ))}
            </Gallery>
         </div>
         <div className="px-8 mt-12 col-span-4 lg:col-span-3 xl:col-span-3 order-1 xl:px-16">
            <p className="text-2xl md:text-3xl xl:text-4xl font-bold">{name}</p>
            <div className="mt-6 xl:mt-12">
               <p>Desde</p>
               <p className="text-4xl font-bold">S/ {price}</p>
            </div>
            <div className="mt-8 flex flex-col gap-2 xl:gap-4 xl:mt-12">
               <div className="md:grid md:grid-cols-2 md:gap-4">
                  <p className="font-semibold">Cama:</p>
                  <p>{characteristics && characteristics[0]}</p>
               </div>
               <div className="md:grid md:grid-cols-2 md:gap-4">
                  <p className="font-semibold">Capacidad:</p>
                  <p>{characteristics && characteristics[1]}</p>
               </div>
               <div className="md:grid md:grid-cols-2 md:gap-4">
                  <p className="font-semibold">Vista:</p>
                  <p>{characteristics && characteristics[2]}</p>
               </div>
               <div className="md:grid md:grid-cols-2 md:gap-4">
                  <p className="font-semibold">Recomendado:</p>
                  <p>{characteristics && characteristics[3]}</p>
               </div>
            </div>
            <div className="pb-16 xl:mt-0 flex">
               <Link
                  href={href}
                  className="bg-[#CB993F] flex items-center justify-center hover:scale-110 transition-all duration-300 mt-10 w-52 h-10 rounded-full"
               >
                  Ver Detalles
               </Link>
            </div>
         </div>
      </div>
   );
}
