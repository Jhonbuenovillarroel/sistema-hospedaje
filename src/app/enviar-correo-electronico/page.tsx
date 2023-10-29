"use client";

import Image from "next/image";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Page = () => {
   const [loading, setLoading] = useState<boolean>(false);

   const sendEmailChangePassword = async (email: any) => {
      const response = await fetch("/api/send-email-change-password", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email,
         }),
      });

      const result = await response.json();

      return result;
   };

   return (
      <main className="bg-zinc-950 text-white">
         <div className="flex items-center justify-center py-40">
            <div className="flex max-w-[400px] flex-col px-10 pt-12 pb-14 rounded-lg bg-zinc-900 items-center justify-center">
               <h1 className="text-3xl font-bold text-center">
                  Reestablece tu contraseña
               </h1>
               <p className="mt-6 text-center">
                  Te enviaremos un correo electrónico para que reestablezcas tu
                  contraseña
               </p>
               <form
                  onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                     e.preventDefault();

                     const formData = new FormData(e.currentTarget);

                     setLoading(true);

                     const result = await sendEmailChangePassword(
                        formData.get("email")
                     );

                     if (result.error) {
                        toast.error(result.error, {
                           style: {
                              background: "#CF3434",
                           },
                           iconTheme: {
                              primary: "#CA5353",
                              secondary: "#fff",
                           },
                        });

                        setTimeout(() => {
                           setLoading(false);
                        }, 2000);
                     } else if (result.user) {
                        toast.success("Email enviado correctamente", {
                           style: {
                              color: "#000",
                           },
                        });

                        setTimeout(() => {
                           setLoading(false);
                        }, 2000);
                     }
                  }}
                  className="mt-10 flex flex-col w-full gap-4"
                  action=""
               >
                  <div className="flex flex-col w-full gap-1">
                     <label htmlFor="email">Correo Electrónico:</label>
                     <input
                        required
                        className="bg-zinc-800 text-sm rounded px-4 py-1 outline-none "
                        type="email"
                        id="email"
                        name="email"
                     />
                  </div>

                  <button
                     disabled={loading}
                     className="mt-6 w-full bg-[#CB993F] h-10 hover:bg-[#daad5b] rounded-md"
                  >
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
                        <p>Enviar Correo</p>
                     )}
                  </button>
               </form>
            </div>
         </div>
      </main>
   );
};

export default Page;
