"use client";

import Image from "next/image";
import Link from "next/link";

export default function Blog() {
   return (
      <main className="bg-zinc-950 text-white">
         <section className="pb-20 md:px-2 lg:px-12 xl:px-16">
            <div className="pt-24 px-8">
               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  Descubre Jauja: Historias, Sabores y Aventuras
               </h1>
               <p className="mt-4 md:text-lg">
                  Te invitamos a sumergirte en el encanto de Jauja a través de
                  nuestro blog. Explora historias fascinantes, disfruta de los
                  sabores auténticos y prepárate para emocionantes aventuras
                  mientras descubrimos juntos todo lo que esta maravillosa
                  región tiene para ofrecer
               </p>
            </div>
         </section>
         <section className="pb-20">
            <div className="mt-8 px-8 flex flex-wrap gap-16 justify-center">
               <article className="max-w-[320px]">
                  <Image
                     src="/laguna-de-paca.jpg"
                     width={800}
                     height={800}
                     alt="Laguna de Paca Jauja"
                  />
                  <h3 className="mt-4 text-xl font-semibold text-center">
                     Platos Típicos de Jauja: Sabores Andinos que Debes Conocer
                  </h3>
                  <p className="text-center mt-6 text-zinc-400 font-semibold">
                     17 Sep, 2023
                  </p>
               </article>
               <article className="max-w-[320px]">
                  <Image
                     src="/laguna-de-paca.jpg"
                     width={800}
                     height={800}
                     alt="Laguna de Paca Jauja"
                  />
                  <h3 className="mt-4 text-xl font-semibold text-center">
                     Platos Típicos de Jauja: Sabores Andinos que Debes Conocer
                  </h3>
                  <p className="text-center mt-6 text-zinc-400 font-semibold">
                     17 Sep, 2023
                  </p>
               </article>
               <article className="max-w-[320px]">
                  <Image
                     src="/laguna-de-paca.jpg"
                     width={800}
                     height={800}
                     alt="Laguna de Paca Jauja"
                  />
                  <h3 className="mt-4 text-xl font-semibold text-center">
                     Platos Típicos de Jauja: Sabores Andinos que Debes Conocer
                  </h3>
                  <p className="text-center mt-6 text-zinc-400 font-semibold">
                     17 Sep, 2023
                  </p>
               </article>
               <article className="max-w-[320px]">
                  <Image
                     src="/laguna-de-paca.jpg"
                     width={800}
                     height={800}
                     alt="Laguna de Paca Jauja"
                  />
                  <h3 className="mt-4 text-xl font-semibold text-center">
                     Platos Típicos de Jauja: Sabores Andinos que Debes Conocer
                  </h3>
                  <p className="text-center mt-6 text-zinc-400 font-semibold">
                     17 Sep, 2023
                  </p>
               </article>
               <article className="max-w-[320px]">
                  <Image
                     src="/laguna-de-paca.jpg"
                     width={800}
                     height={800}
                     alt="Laguna de Paca Jauja"
                  />
                  <h3 className="mt-4 text-xl font-semibold text-center">
                     Platos Típicos de Jauja: Sabores Andinos que Debes Conocer
                  </h3>
                  <p className="text-center mt-6 text-zinc-400 font-semibold">
                     17 Sep, 2023
                  </p>
               </article>
               <article className="max-w-[320px]">
                  <Image
                     src="/laguna-de-paca.jpg"
                     width={800}
                     height={800}
                     alt="Laguna de Paca Jauja"
                  />
                  <h3 className="mt-4 text-xl font-semibold text-center">
                     Platos Típicos de Jauja: Sabores Andinos que Debes Conocer
                  </h3>
                  <p className="text-center mt-6 text-zinc-400 font-semibold">
                     17 Sep, 2023
                  </p>
               </article>
            </div>
         </section>
      </main>
   );
}
