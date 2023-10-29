import Image from "next/image";
import React from "react";

const Page = () => {
   return (
      <main className="py-40 bg-zinc-950 text-white">
         <div className="flex flex-col px-8 items-center justify-center">
            <Image
               className="w-40"
               src="/logo-hospedaje.png"
               width={800}
               height={800}
               alt="logo hospedaje"
            />

            <h1 className="text-2xl text-center font-bold mt-8">
               Tu reservación se realizó con éxito
            </h1>
            <p className="mt-4 text-center">
               Por favor revisa tu correo electrónico, te enviamos un correo con
               los detalles de tu reserva
            </p>
            <p className="mt-2 text-center">Que tengas un buen día 😊</p>
         </div>
      </main>
   );
};

export default Page;
