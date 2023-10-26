"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
   href: string;
   src: string;
   name: string;
   description: string;
   price: number;
}

export default function RecommendedRoom({
   href,
   src,
   name,
   description,
   price,
}: Props) {
   return (
      <div className="max-w-[400px] md:max-w-[320px] h-full">
         <Link
            href={href}
            className="relative h-full image-container before:transition-all before:duration-500 before:ease-in-out cursor-pointer hover:before:content-[''] hover:before:absolute hover:before:top-0 hover:before:right-0 hover:before:bottom-0 hover:before:left-0 before:bg-[rgba(0,0,0,0)] hover:before:bg-[rgba(0,0,0,0.75)]"
         >
            <div className="transition-all duration-500"></div>
            <div className="transition-all duration-500"></div>
            <Image
               className="h-full object-cover snap-center w-fit"
               src={src}
               width={800}
               height={800}
               alt={name}
            />
         </Link>
         <p className="mt-6 text-xl px-2 font-bold text-center">{name}</p>
         <hr className="border-zinc-800 my-4" />
         <p className="text-center">{description}</p>
         <div className="mt-6 grid grid-cols-2 items-center justify-items-center">
            <div className="border-r w-full text-center border-zinc-800">
               <p>From</p>
               <p className="font-bold text-2xl">S/ {price}</p>
            </div>
            <Link className="border-b font-bold" href={href}>
               Ver Detalles
            </Link>
         </div>
      </div>
   );
}
