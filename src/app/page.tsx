"use client";

import BookForm from "@/components/BookForm";
import Gallery from "@/components/Gallery";
import Room from "@/components/Room";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
   return (
      <main className="">
         <section className="h-screen relative flex flex-col items-center justify-center">
            <Gallery displacement={320}>
               <div className="min-w-full relative before:content-['] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.6)] snap-center h-screen bg-cover bg-no-repeat bg-center bg-[url('/plaza-jauja-noche.jpg')] flex items-center justify-center">
                  <div className="w-[200px] sm:w-[360px] md:w-[400px] lg:w-[700px] z-10 flex flex-col items-center justify-center text-center">
                     <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">
                        Encanto fjkldsjfksjdf
                     </h1>
                     <p className="mt-4 sm:w-[240px] text-sm lg:text-base">
                        Comodidad y auténtico encanto en el corazón de Jauja
                     </p>
                  </div>
               </div>
               <div className="min-w-full relative before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.6)] snap-center h-screen bg-cover bg-no-repeat bg-center bg-[url('/canon-de-shucto.jpg')] flex items-center justify-center">
                  <div className="w-[200px] sm:w-[360px] md:w-[400px] lg:w-[700px] z-10 flex flex-col items-center justify-center text-center">
                     <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">
                        Descanso Eterno
                     </h1>
                     <p className="mt-4 sm:w-[240px] text-sm lg:text-base">
                        Experiencia única de relajación en Jauja con precios
                        competitivos
                     </p>
                  </div>
               </div>
               <div className="min-w-full relative before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.6)] snap-center h-screen bg-cover bg-no-repeat bg-center bg-[url('/laguna-de-paca.jpg')] flex items-center justify-center">
                  <div className="w-[200px] sm:w-[360px] md:w-[400px] lg:w-[700px] z-10 flex flex-col items-center justify-center text-center">
                     <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">
                        Tranquilidad Única
                     </h1>
                     <p className="mt-4 sm:w-[240px] text-sm lg:text-base">
                        Paz, comodidad y serenidad en un refugio excepcional en
                        Jauja
                     </p>
                  </div>
               </div>
            </Gallery>
         </section>
         <section className="mt-16">
            <BookForm
               className="px-12 w-full flex flex-col gap-4 md:grid md:grid-cols-5"
               alignButton="md:self-end"
            />
         </section>
         <section className="my-16 xl:flex lg:gap-32">
            <div className="relative xl:top-20 px-6 lg:px-20 xl:max-w-[600px] flex flex-col xl:items-center xl:justify-center">
               <p className="uppercase tracking-widest text-xs text-center xl:self-start xl:text-start">
                  Sobre Hospedaje El Rinconcito
               </p>
               <h2 className="text-3xl mt-4 font-bold text-center xl:self-start xl:text-start xl:text-5xl">
                  Historia y Hospitalidad
               </h2>
               <p className="mt-4">
                  En Hospedaje &quot;El Rinconcito&quot;, nuestra historia es la
                  de la hospitalidad auténtica. Nos enorgullecemos de ofrecer un
                  refugio tranquilo y cómodo en el corazón de Jauja. Cada
                  detalle, desde nuestras habitaciones hasta nuestro servicio,
                  está diseñado para hacer que tu estancia sea especial.
                  Descubre quiénes somos y lo que hacemos en Hospedaje &quot;El
                  Rinconcito&quot;. Esperamos ser tu elección en tu próxima
                  visita a Jauja.
               </p>
            </div>
            <div className="mt-24 flex flex-col items-center justify-center">
               <div className="h-auto w-auto relative flex">
                  <Image
                     className="relative left-[-44px] sm:left-[-80px] md:left-[-80px] w-48 sm:w-80 md:w-96"
                     src="/laguna-de-paca.jpg"
                     width={800}
                     height={800}
                     alt="laguna de paca jauja"
                  />
                  <Image
                     className="absolute left-24 top-4 sm:left-36 md:left-48 z-10 w-36 sm:w-64 md:w-80"
                     src="/canon-de-shucto.jpg"
                     width={800}
                     height={800}
                     alt="laguna de paca jauja"
                  />
                  <Image
                     className="absolute left-12 top-28 sm:left-24 md:left-28 sm:top-40 md:top-48 w-32 sm:w-56 md:w-72"
                     src="/ruinas-tunanmarca.jpg"
                     width={800}
                     height={800}
                     alt="laguna de paca jauja"
                  />
               </div>
            </div>
         </section>
         <section className="mt-60">
            <Room
               images={[
                  "/fotos__hospedaje/303-1.jpg",
                  "/fotos__hospedaje/303-2.jpg",
               ]}
               name="Habitacion Estándar"
               price={60}
               characteristics={[
                  "Cama 2 plazas",
                  "2 adultos y 1 niño",
                  "Habitación interior",
                  "Persona sola o pareja",
               ]}
               href="/habitacion-estandar"
            />
         </section>

         <section className="mt-20 mb-20">
            <div className="px-6">
               <p className="uppercase tracking-widest text-xs text-center">
                  Maravilla Cultural
               </p>
               <h2 className="text-3xl md:text-4xl mt-4 font-bold text-center">
                  Aprende más sobre Jauja
               </h2>
               <p className="mt-4 text-center">
                  Descubre tesoros naturales y culturales, sé parte de nuestra
                  aventura virtual
               </p>

               <div className="mt-8 flex flex-wrap items-center justify-center gap-16">
                  <article className="max-w-[320px]">
                     <Image
                        className=""
                        src="/laguna-de-paca.jpg"
                        width={800}
                        height={800}
                        alt="Laguna de Paca Jauja"
                     />
                     <h3 className="mt-4 text-xl font-semibold">
                        Platos Típicos de Jauja: Sabores Andinos que Debes
                        Conocer
                     </h3>
                     <Link
                        className="flex w-fit text-[#ecc883] border-[#ecc883] items-center mt-4 gap-2 border-b"
                        href="#"
                     >
                        Leer artículo{" "}
                     </Link>
                  </article>
                  <article className="max-w-[320px]">
                     <Image
                        className=""
                        src="/laguna-de-paca.jpg"
                        width={800}
                        height={800}
                        alt="Laguna de Paca Jauja"
                     />
                     <h3 className="mt-4 text-xl font-semibold">
                        Platos Típicos de Jauja: Sabores Andinos que Debes
                        Conocer
                     </h3>
                     <Link
                        className="flex w-fit text-[#ecc883] border-[#ecc883] items-center mt-4 gap-2 border-b"
                        href="#"
                     >
                        Leer artículo{" "}
                     </Link>
                  </article>
                  <article className="max-w-[320px]">
                     <Image
                        className=""
                        src="/laguna-de-paca.jpg"
                        width={800}
                        height={800}
                        alt="Laguna de Paca Jauja"
                     />
                     <h3 className="mt-4 text-xl font-semibold">
                        Platos Típicos de Jauja: Sabores Andinos que Debes
                        Conocer
                     </h3>
                     <Link
                        className="flex w-fit text-[#ecc883] border-[#ecc883] items-center mt-4 gap-2 border-b"
                        href="#"
                     >
                        Leer artículo{" "}
                     </Link>
                  </article>
               </div>
            </div>
         </section>
      </main>
   );
}
