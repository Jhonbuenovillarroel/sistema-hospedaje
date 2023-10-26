"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";

export default function Contacto() {
   return (
      <main>
         <section className="mb-20">
            <div className="pt-24 px-8 md:flex md:justify-between md:gap-8 lg:px-16">
               <div className="md:max-w-[500px] lg:max-w-[800px]">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                     Ubicación Ideal en el Corazón de Jauja
                  </h1>
                  <p className="mt-4">
                     Nuestra ubicación en el corazón de Jauja te brinda acceso
                     privilegiado a sus tesoros culturales y naturales
                  </p>
               </div>
               <button className="bg-[#CB993F] flex items-center justify-center gap-2 h-10 rounded-full uppercase text-xs font-medium tracking-widest mt-8 w-52">
                  <FaMapMarkerAlt /> Obtener Dirección
               </button>
            </div>
         </section>
         <section className="mt-12">
            <iframe
               className="w-full"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.8768969078455!2d-75.49992272607314!3d-11.773717536874686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910ecdc493e31339%3A0x6c676d03ac1bd3d9!2sHospedaje%20El%20Rinconcito!5e0!3m2!1ses-419!2spe!4v1694976076391!5m2!1ses-419!2spe"
               width="600"
               height="450"
               allowFullScreen
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="mt-20 px-8 flex text-center flex-col items-center justify-center gap-16 md:flex-row md:gap-20  md:items-start">
               <div className="max-w-[300px] md:max-w-[180px] lg:max-w-[300px]">
                  <p className="font-semibold lg:text-xl">Nuestra Dirección</p>
                  <p className="mt-2 text-lg">Jr. Salaverry 861</p>
               </div>
               <div className="max-w-[300px] md:max-w-[180px] lg:max-w-[300px]">
                  <p className="font-semibold lg:text-xl">En carro</p>
                  <p className="mt-2 text-lg">
                     Aproximadamente a 5 minutos del aeropuerto (1km)
                  </p>
               </div>
               <div className="max-w-[300px] md:max-w-[180px] lg:max-w-[300px]">
                  <p className="font-semibold lg:text-xl">Caminando</p>
                  <p className="mt-2 text-lg">
                     Aproximadamente a 5 minutos de la Plaza de Armas de Jauja
                     (3 cuadras - 300m)
                  </p>
               </div>
            </div>
         </section>
         <section className="mb-20 mt-20 md:flex">
            <div className="px-8 md:pl-14 lg:px-20 md:max-w-[1500px]">
               <h2 className="text-3xl font-bold">
                  ¿Tienes alguna duda o pregunta?
               </h2>

               <div className="mt-16 h-auto">
                  <form className="flex flex-col gap-6">
                     <div className="flex flex-col gap-2">
                        <label htmlFor="name">Nombre (*)</label>
                        <input
                           className="border-b outline-none bg-transparent px-3 h-10"
                           type="text"
                           id="name"
                           name="name"
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <label htmlFor="email">Correo Electrónico (*)</label>
                        <input
                           className="border-b outline-none bg-transparent px-3 h-10"
                           type="email"
                           id="email"
                           name="email"
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Teléfono</label>
                        <input
                           className="border-b outline-none bg-transparent px-3 h-10"
                           type="tel"
                           id="phone"
                           name="phone"
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Tu mensaje (*)</label>
                        <textarea
                           name="phone"
                           id="phone"
                           cols={30}
                           rows={4}
                           className="border-b outline-none bg-transparent px-3"
                        ></textarea>
                     </div>

                     <div className="flex mt-8 items-start gap-2">
                        <input
                           type="checkbox"
                           className="relative top-1 bg-transparent outline-none"
                        />
                        <p>
                           Doy mi consentimiento a Hospedaje "El Rinconcito"
                           para recolectar mis datos a través de este formulario
                        </p>
                     </div>

                     <button className="bg-[#CB993F] hover:scale-110 transition-all duration-300 flex items-center justify-center gap-2 h-10 rounded-full uppercase text-xs font-medium tracking-widest mt-8 w-40">
                        <p>Enviar</p>
                        <BiSolidSend className="w-3 h-3" />
                     </button>
                  </form>
               </div>
            </div>

            <div className="flex justify-center items-center md:pr-6 lg:pr-20">
               <div className="mt-20 w-96">
                  <div className="bg-zinc-900 relative py-8 md:py-16 mx-8 border border-zinc-500 text-center flex flex-col gap-8 before:content-[''] before:absolute before:top-[-5px] before:right-[-5px] before:bottom-[-5px] before:left-[-5px] before:border before:border-zinc-500">
                     <div className="flex flex-col gap-2">
                        <p className="font-semibold">Hospedaje El Rinconcito</p>
                        <p>Jr. Salaverry 861</p>
                     </div>
                     <div className="flex flex-col gap-2">
                        <p>Cel: +51 935 242 432</p>
                        <p>Tel: (064) 362866</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </main>
   );
}
