"use client";

import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
   toggleMenu: Function;
   showMenu: string;
   className: string;
   letterType: string;
}

export default function NavBar({
   toggleMenu,
   showMenu,
   className,
   letterType,
}: Props) {
   return (
      <ul className={`${showMenu} ${className}`}>
         <AiOutlineClose
            onClick={() => {
               toggleMenu();
            }}
            className="w-6 h-6 text-white lg:hidden absolute top-7 right-6 cursor-pointer"
         />
         <li>
            <Link
               onClick={() => {
                  toggleMenu();
               }}
               href="/"
               className={`font-medium ${letterType}`}
            >
               Home
            </Link>
         </li>
         <li>
            <Link
               onClick={() => {
                  toggleMenu();
               }}
               href="/nuestras-habitaciones"
               className={`font-medium ${letterType}`}
            >
               Nuestras Habitaciones
            </Link>
         </li>
         <li>
            <Link
               onClick={() => {
                  toggleMenu();
               }}
               href="/sobre-nosotros"
               className={`font-medium ${letterType}`}
            >
               Sobre Nosotros
            </Link>
         </li>
         <li>
            <Link
               onClick={() => {
                  toggleMenu();
               }}
               href="/contacto"
               className={`font-medium ${letterType}`}
            >
               Contacto
            </Link>
         </li>
         <li>
            <Link
               onClick={() => {
                  toggleMenu();
               }}
               href="/blog"
               className={`font-medium ${letterType}`}
            >
               Blog
            </Link>
         </li>
      </ul>
   );
}
