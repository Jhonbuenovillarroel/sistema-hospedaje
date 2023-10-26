"use client";

import React, { useRef } from "react";
import { BsChevronLeft, BsChevronRight, BsArrowRight } from "react-icons/bs";

interface Props {
   children: React.ReactNode;
   displacement: number;
   width?: string;
   sizeArrow?: string;
   paddingArrow?: number;
}

export default function Gallery({
   children,
   displacement,
   width,
   sizeArrow,
   paddingArrow,
}: Props) {
   const galleryRef = useRef<HTMLDivElement>(null);

   const moveGalleryLeft = () => {
      galleryRef.current?.scrollBy(-displacement, 0);
   };
   const moveGalleryRight = () => {
      galleryRef.current?.scrollBy(displacement, 0);
   };

   return (
      <div
         className={`flex relative ${
            width ? width : "w-full"
         } h-full custom-scroll-bar bg-zinc-900 overflow-x-scroll scroll-smooth snap-x snap-mandatory items-center`}
      >
         <div
            ref={galleryRef}
            className={`flex ${
               width ? width : "w-full"
            } h-full custom-scroll-bar overflow-x-scroll scroll-smooth snap-x snap-mandatory items-center`}
         >
            <div
               onClick={() => {
                  moveGalleryLeft();
               }}
               className="bg-[rgba(0,0,0,0.6)] rounded-full p-2 cursor-pointer z-10 absolute left-2 md:left-6"
            >
               <BsChevronLeft
                  className={`w-5 h-5 sm:w-6 sm:h-6 flex flex-col items-center justify-center`}
               />
            </div>
            <div
               onClick={() => {
                  moveGalleryRight();
               }}
               className="bg-[rgba(0,0,0,0.6)] rounded-full p-2 cursor-pointer z-10 absolute right-2 md:right-6"
            >
               <BsChevronRight
                  className={`w-5 h-5 sm:w-6 sm:h-6 flex flex-col items-center justify-center`}
               />
            </div>
            {children}
         </div>
      </div>
   );
}
