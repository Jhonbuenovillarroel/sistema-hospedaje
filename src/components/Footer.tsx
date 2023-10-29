"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
   const pathname = usePathname();

   if (/^\/panel-administracion(\/[\w-]+)*$/.test(pathname)) {
      return;
   }

   return (
      <footer className="bg-zinc-900 pb-8 text-white">
         <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-28 pt-16">
            <div className="text-center max-w-[300px] md:max-w-[200px] lg:max-w-[400px]">
               <p className="text-sm font-semibold tracking-widest uppercase">
                  Nuestra Dirección
               </p>
               <div>
                  <p className="mt-6 font-bold">Hospedaje El Rinconcito</p>
                  <p className="mt-1">Jr. Salaverry 861 Jauja - Perú</p>
               </div>
            </div>
            <div className="text-center max-w-[300px] md:max-w-[200px] lg:max-w-[400px]">
               <p className="text-sm font-semibold tracking-widest uppercase">
                  Reservaciones
               </p>
               <div>
                  <p className="mt-6">Celular/Whatsapp: +51 997706692</p>
                  <p className="mt-1">Teléfono: (064) 362866</p>
               </div>
            </div>
            <div className="px-8 mb-10 max-w-[300px] md:max-w-[500px]">
               <form className="text-center md:text-start md:w-[200px] lg:w-[300px] flex flex-col">
                  <p className="text-sm font-semibold tracking-widest uppercase">
                     Suscríbete
                  </p>
                  <input
                     onChange={() => {}}
                     className="mt-6 px-2 py-2 bg-transparent outline-none border-b"
                     type="email"
                     placeholder="Tu mejor email"
                  />
                  <button className="mt-8 h-10 rounded-full bg-[#CB993F]">
                     Suscribirse
                  </button>
               </form>
            </div>
         </div>
         <hr className="w-full border-t-zinc-700" />
         <div className="mt-8">
            <div>
               <ul className="flex gap-x-5 gap-y-2 flex-wrap justify-center">
                  <li>
                     <Link href="#">Home</Link>
                  </li>
                  <li>
                     <Link href="#">Nuestras Habitaciones</Link>
                  </li>
                  <li>
                     <Link href="#">Sobre Nosotros</Link>
                  </li>
                  <li>
                     <Link href="#">Contacto</Link>
                  </li>
                  <li>
                     <Link href="#">Terminos y Condiciones</Link>
                  </li>
               </ul>
            </div>
            <div className="mt-8 text-center px-6">
               <p>© Copyright Hospedaje El Riconcito 2023</p>
            </div>
         </div>
      </footer>
   );
}
