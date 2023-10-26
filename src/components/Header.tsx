"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsList } from "react-icons/bs";
import NavBar from "./NavBar";
import { usePathname } from "next/navigation";

export default function Header() {
   const pathname = usePathname();

   if (/^\/panel-administracion(\/[\w-]+)*$/.test(pathname)) {
      return;
   }

   const [showMenu, setShowMenu] = useState<string>(
      "flex flex-col h-0 opacity-0"
   );
   const [bgColor, setBgColor] = useState<string>("");

   const toggleMenu = () => {
      if (showMenu === "flex flex-col h-0 opacity-0") {
         setShowMenu("flex flex-col h-full opacity-100");
      } else {
         setShowMenu("flex flex-col h-0 opacity-0");
      }
   };

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 20) {
            setBgColor("bg-[rgba(0,0,0,0.9)]");
         } else {
            setBgColor("");
         }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <header
         onScroll={() => {
            console.log(window.scrollY);
         }}
         className={`${bgColor} flex fixed transition-all duration-500 ease-in-out z-20 w-full h-20 sm:h-28 md:h-auto py-3 px-4 items-center justify-between`}
      >
         <div className="flex gap-8 lg:gap-0">
            <Link href="/" className="flex">
               <Image
                  className="w-28 sm:w-32 md:w-36"
                  src="/logo-hospedaje.png"
                  width={800}
                  height={800}
                  alt="Logo hospedaje"
               />
            </Link>
            <NavBar
               toggleMenu={() => {}}
               className="hidden lg:flex overflow-hidden w-full h-auto items-center justify-center gap-6"
               showMenu=""
               letterType=""
            />
         </div>
         <div className="pr-6">
            <BsList
               onClick={() => {
                  toggleMenu();
               }}
               className="w-6 h-6 lg:hidden cursor-pointer"
            />
            <NavBar
               toggleMenu={toggleMenu}
               className="transition-all duration-700 ease-in-out overflow-hidden sm:flex w-full sm:flex-col items-center justify-center gap-6 fixed z-0 top-0 right-0 bottom-0 left-0 bg-black"
               showMenu={showMenu}
               letterType="uppercase text-sm"
            />
         </div>
      </header>
   );
}
