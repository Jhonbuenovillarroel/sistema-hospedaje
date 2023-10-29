import Gallery from "@/components/Gallery";
import Image from "next/image";

export default function SobreNosotros() {
   return (
      <main className="dark:bg-zinc-950 text-black dark:text-white">
         <section className="">
            <div className="pt-24 px-8 md:px-20 lg:px-28">
               <h1 className="text-3xl md:text-4xl lg:text-5xl max-w-[800px] font-bold">
                  Habitaciones Encantadoras en el Corazón de Jauja
               </h1>
               <p className="mt-4 md:text-lg">
                  Descubre el encanto y confort de nuestras habitaciones en
                  Jauja.
               </p>
            </div>
            <div className="mt-16 overflow-hidden flex justify-center">
               <Image
                  className="relative"
                  src="/laguna-de-paca.jpg"
                  width={800}
                  height={800}
                  alt="laguna de pacaf"
               />
            </div>
            <div className="mt-16 px-10 leading-7 text-center flex justify-center">
               <p className="max-w-[800px]">
                  En Hospedaje &quot;El Rinconcito&quot;, la hospitalidad es
                  nuestra pasión y la satisfacción de nuestros huéspedes es
                  nuestro mayor logro. Desde nuestros humildes comienzos hasta
                  convertirnos en una opción de confianza en Jauja, hemos
                  recorrido un camino de dedicación y compromiso.
               </p>
            </div>
         </section>
         <section>
            <div className="mt-16 h-[400px]">
               <Gallery displacement={200}>
                  <Image
                     className="w-fit h-full snap-center"
                     src="/laguna-de-paca.jpg"
                     width={800}
                     height={800}
                     alt="laguna de pacaf"
                  />
                  <Image
                     className="w-fit h-full snap-center"
                     src="/plaza-jauja-noche.jpg"
                     width={800}
                     height={800}
                     alt="laguna de pacaf"
                  />
                  <Image
                     className="w-fit h-full snap-center"
                     src="/ruinas-tunanmarca.jpg"
                     width={800}
                     height={800}
                     alt="laguna de pacaf"
                  />
                  <Image
                     className="w-fit h-full snap-center"
                     src="/laguna-de-paca.jpg"
                     width={800}
                     height={800}
                     alt="laguna de pacaf"
                  />
               </Gallery>
            </div>
         </section>
         <section className="pb-16">
            <div className="pt-24 px-8 md:max-w-[800px] md:px-20 lg:max-w-[950px] lg:px-28">
               <h2 className="text-3xl font-bold">
                  Nuestra Historia en Hospedaje &quot;El Rinconcito&quot;
               </h2>
               <p className="mt-4">
                  Fundado por amantes de Jauja y apasionados por brindar
                  experiencias inolvidables, Hospedaje &quot;El Rinconcito&quot;
                  se ha convertido en un refugio donde los viajeros encuentran
                  comodidad y autenticidad. <br /> <br /> Nuestra visión es
                  simple: ofrecer un lugar donde los huéspedes se sientan como
                  en casa. Nuestro equipo está compuesto por personas que
                  comparten un profundo amor por la región y su cultura. <br />
                  <br /> Estamos aquí para asegurarnos de que tu estancia sea
                  perfecta, brindándote consejos locales y haciendo que te
                  sientas parte de la familia &quot;El Rinconcito&quot;.
               </p>
            </div>
         </section>
      </main>
   );
}
