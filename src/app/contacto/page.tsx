"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function Contacto() {
   const [loading, setLoading] = useState<boolean>(false);

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
                  <form
                     onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();

                        const formData = new FormData(e.currentTarget);

                        setLoading(true);

                        const response = await fetch(
                           "/api/send-email-contact",
                           {
                              method: "POST",
                              headers: {
                                 "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                 name: formData.get("name"),
                                 email: formData.get("email"),
                                 phone: formData.get("phone"),
                                 message: formData.get("message"),
                              }),
                           }
                        );

                        const result = await response.json();

                        if (result.error) {
                           toast.error("Hubo un problema al enviar el correo", {
                              style: {
                                 background: "#CF3434",
                              },
                              iconTheme: {
                                 primary: "#CA5353",
                                 secondary: "#fff",
                              },
                           });

                           setLoading(false);
                        } else if (result.ok) {
                           toast.success("Email enviado correctamente", {
                              style: {
                                 color: "#000",
                              },
                           });

                           setLoading(false);
                        }
                     }}
                     className="flex flex-col gap-6"
                  >
                     <div className="flex flex-col gap-2">
                        <label htmlFor="name">Nombre (*)</label>
                        <input
                           required
                           className="border-b outline-none bg-transparent px-3 h-10"
                           type="text"
                           id="name"
                           name="name"
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <label htmlFor="email">Correo Electrónico (*)</label>
                        <input
                           required
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
                        <label htmlFor="message">Tu mensaje (*)</label>
                        <textarea
                           required
                           name="message"
                           id="message"
                           cols={30}
                           rows={4}
                           className="border-b outline-none bg-transparent px-3"
                        ></textarea>
                     </div>

                     <div className="flex mt-8 items-start gap-2">
                        <input
                           required
                           type="checkbox"
                           id="permission"
                           name="permission"
                           className="relative top-1 bg-transparent outline-none"
                        />
                        <label htmlFor="permission">
                           Doy mi consentimiento a Hospedaje "El Rinconcito"
                           para recolectar mis datos a través de este formulario
                        </label>
                     </div>

                     <button className="bg-[#CB993F] hover:scale-110 transition-all duration-300 flex items-center justify-center gap-2 h-10 rounded-full uppercase text-xs font-medium tracking-widest mt-8 w-40">
                        {loading ? (
                           <div
                              className="flex items-center justify-center"
                              role="status"
                           >
                              <svg
                                 aria-hidden="true"
                                 className="w-6 h-6 mr-2 text-white animate-spin dark:text-gray-600 fill-white"
                                 viewBox="0 0 100 101"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                 />
                                 <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                 />
                              </svg>
                              <span className="text-white">Loading...</span>
                           </div>
                        ) : (
                           <>
                              <p>Enviar</p>
                              <BiSolidSend className="w-3 h-3" />
                           </>
                        )}
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
