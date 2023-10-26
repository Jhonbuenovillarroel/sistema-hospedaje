"use client";

import {
   IoBedOutline,
   IoPeopleOutline,
   IoPartlySunnyOutline,
} from "react-icons/io5";
import { BsDoorOpen } from "react-icons/bs";
import { MdRoomService, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import Gallery from "./Gallery";
import Image from "next/image";
import BookForm from "./BookForm";
import React, { useState } from "react";
import RecommendedRoom from "./RecommendedRoom";

type RecommendedRoom = {
   href: string;
   src: string;
   name: string;
   description: string;
   price: number;
};

interface Props {
   name: string;
   subtitle: string;
   descriptionTitle: string;
   descriptionContent: React.ReactNode;
   price: number;
   characteristics: string[];
   amenities: string[];
   services: string[];
   urlImages: string[];
   recommendedRooms: RecommendedRoom[];
   backgroundImage: string;
}

export default function RoomDetails({
   name,
   subtitle,
   descriptionTitle,
   descriptionContent,
   price,
   characteristics,
   amenities,
   services,
   urlImages,
   recommendedRooms,
   backgroundImage,
}: Props) {
   const [showBookForm, setShowBookForm] = useState(false);

   const toggleBookForm = () => {
      if (showBookForm) {
         setShowBookForm(false);
      } else {
         setShowBookForm(true);
      }
   };

   return (
      <>
         <section className="h-full w-full">
            <div
               className={`h-[400px] sm:h-[500px] relative w-full flex flex-col items-center justify-center ${backgroundImage} bg-center bg-no-repeat bg-cover before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.5)]`}
            >
               <div className="z-10 flex flex-col items-center justify-center">
                  <h1 className="text-center text-4xl md:text-5xl max-w-[280px] md:max-w-[700px] font-bold">
                     {name}
                  </h1>
                  <p className="text-center text-base max-w-[240px] md:max-w-[500px] mt-4">
                     {subtitle}
                  </p>
               </div>
            </div>
         </section>
         <section className="mb-20">
            <div className="">
               <div className="z-10 relative bottom-16 sm:bottom-20 flex flex-wrap gap-x-4 gap-y-2 items-center justify-center uppercase text-sm font-semibold text-zinc-200">
                  <Link href="#">Detalles</Link>
                  <Link href="#">Comodidades y Servicios</Link>
                  <Link href="#">Galería</Link>
               </div>
               <div className="bg-zinc-900 relative bottom-12 py-8 mx-6 md:py-16 lg:grid lg:grid-cols-8 px-7 sm:px-12 lg:pl-16">
                  <div className="max-w-[900px] lg:col-span-5 lg:border-r lg:border-zinc-800 lg:pr-16">
                     <h2 className="text-2xl md:text-3xl font-semibold leading-9">
                        {descriptionTitle}
                     </h2>

                     {descriptionContent}
                  </div>
                  <div className="flex flex-col lg:col-span-3 w-full items-center justify-center sm:grid sm:grid-cols-2 sm:justify-items-center lg:flex lg:flex-col lg:items-center lg:justify-start lg:gap-12 lg:pl-12">
                     <div className="mt-20 w-full xl:mt-0 flex flex-col items-center justify-center">
                        <p className="text-center">Desde</p>
                        <p className="text-5xl mt-6 font-bold text-center">
                           S/ {price}
                        </p>
                        <button
                           onClick={() => {
                              toggleBookForm();
                           }}
                           className="bg-[#CB993F] flex items-center justify-center hover:scale-110 transition-all duration-300 mt-10 w-full max-w-[200px] sm:max-w-[280px] h-10 rounded-full"
                        >
                           Reservar Ahora
                        </button>
                        {showBookForm && (
                           <BookForm
                              className="mt-10 w-full flex flex-col gap-4 max-w-[400px] lg:max-w-[300px]"
                              alignButton=""
                           />
                        )}
                     </div>
                     <div className="mt-16 max-w-[200px] sm:max-w-full w-full flex flex-col gap-4 xl:gap-4 xl:mt-0">
                        <div className="grid grid-cols-2 gap-4 items-center justify-items-center">
                           <IoBedOutline className="w-10 h-10" />
                           <p className="justify-self-start">
                              {characteristics[0]}
                           </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 items-center justify-items-center">
                           <IoPeopleOutline className="w-10 h-10" />
                           <p className="justify-self-start">
                              {characteristics[1]}
                           </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 items-center justify-items-center">
                           <IoPartlySunnyOutline className="w-10 h-10" />
                           <p className="justify-self-start">
                              {characteristics[2]}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="">
            <div className="flex flex-col sm:grid sm:grid-cols-2 sm:items-center sm:justify-items-center gap-10 items-center justify-center">
               <div>
                  <div>
                     <BsDoorOpen className="w-10 h-10" />
                     <p className="text-2xl font-semibold mt-2">Comodidades</p>
                  </div>
                  <div className="mt-4">
                     <ul className="flex flex-col gap-3">
                        {amenities &&
                           amenities.map((element, i) => (
                              <li key={i} className="flex gap-2 items-center">
                                 <MdKeyboardArrowRight /> {element}
                              </li>
                           ))}
                     </ul>
                  </div>
               </div>
               <div>
                  <div>
                     <MdRoomService className="w-10 h-10" />
                     <p className="text-2xl font-semibold mt-2">Servicios</p>
                  </div>
                  <div className="mt-4">
                     <ul className="flex flex-col gap-3">
                        {services &&
                           services.map((element, i) => (
                              <li key={i} className="flex gap-2 items-center">
                                 <MdKeyboardArrowRight /> {element}
                              </li>
                           ))}
                     </ul>
                  </div>
               </div>
            </div>
         </section>
         <section className="mt-20">
            <Gallery displacement={320}>
               {urlImages &&
                  urlImages.map((element, i) => (
                     <Image
                        className="h-full snap-center object-cover"
                        src={element}
                        width={500}
                        height={500}
                        alt="Habitación estándar"
                     />
                  ))}
            </Gallery>
         </section>
         <section className="my-20">
            <div>
               <div className="flex flex-col items-center justify-center">
                  <h3 className="text-4xl text-center font-bold">
                     Otras Habitaciones
                  </h3>
                  <p className="text-center max-w-[240px] mt-3">
                     También podrían ser de tu interés
                  </p>
               </div>
               <div className="mt-16 h-full px-8 flex flex-col items-center justify-center md:flex-row md:items-start gap-16 md:gap-8">
                  {recommendedRooms &&
                     recommendedRooms.map((element, i) => (
                        <RecommendedRoom
                           key={i}
                           href={element.href}
                           src={element.src}
                           name={element.name}
                           description={element.description}
                           price={element.price}
                        />
                     ))}
               </div>
            </div>
         </section>
      </>
   );
}
