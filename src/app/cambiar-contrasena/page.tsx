"use client";

import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const Page = () => {
   const searchParams = useSearchParams();

   const router = useRouter();

   const [validToken, setValidToken] = useState<boolean>(false);
   const [loading, setLoading] = useState(true);
   const [errorExists, setErrorExists] = useState(false);
   const [data, setData] = useState<any>();
   const [loadingForm, setLoadingForm] = useState<boolean>(false);

   const token = searchParams.get("token");

   const validateToken = async () => {
      const response = await fetch("/api/validate-token-change-password");

      const result = await response.json();

      return result;
   };

   const changePasswordAdministratorUser = async (
      email: any,
      newPassword: any
   ) => {
      const response = await fetch("/api/change-password-administrator-user", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email,
            newPassword,
         }),
      });

      const result = await response.json();

      return result;
   };

   useEffect(() => {
      (async () => {
         const result = await validateToken();

         if (result.error) {
            setErrorExists(true);
         } else if (result.token) {
            setData(result.token);
            setLoading(false);
         }
      })();
   }, []);

   if (errorExists) {
      return (
         <div className="flex items-center justify-center py-40">
            Este enlace para cambiar tu contraseña ya caducó
         </div>
      );
   }

   if (loading) {
      return (
         <div className="py-48 fixed bg-zinc-950 top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center">
            <Image
               className="w-40"
               src="/logo-hospedaje.png"
               width={800}
               height={800}
               alt="logo-hospedaje"
            />
            <div className="flex items-center justify-center" role="status">
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
         </div>
      );
   } else {
      return (
         <main>
            <div className="flex items-center justify-center py-40">
               <div className="flex max-w-[400px] flex-col px-10 pt-12 pb-14 rounded-lg bg-zinc-900 items-center justify-center">
                  <h1 className="text-3xl font-bold text-center">
                     Elige tu nueva contraseña
                  </h1>

                  <form
                     onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();

                        const formData = new FormData(e.currentTarget);
                        console.log(data);

                        if (
                           !formData.get("newPassword") ||
                           !formData.get("confirmPassword")
                        ) {
                           toast.error("Ningún campo puede estar vacío", {
                              style: {
                                 background: "#CF3434",
                              },
                              iconTheme: {
                                 primary: "#CA5353",
                                 secondary: "#fff",
                              },
                           });
                           return;
                        }

                        if (
                           !(
                              formData.get("newPassword") ===
                              formData.get("confirmPassword")
                           )
                        ) {
                           toast.error(
                              "Las contraseñas tienen que ser iguales",
                              {
                                 style: {
                                    background: "#CF3434",
                                 },
                                 iconTheme: {
                                    primary: "#CA5353",
                                    secondary: "#fff",
                                 },
                              }
                           );
                           return;
                        }
                        setLoadingForm(true);

                        const result = await changePasswordAdministratorUser(
                           data?.data?.email,
                           formData.get("newPassword")
                        );

                        if (result.ok) {
                           toast.success("Contraseña cambiada correctamente", {
                              style: {
                                 color: "#000",
                              },
                           });
                           setTimeout(() => {
                              setLoadingForm(false);
                           }, 2000);
                        }

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
                              setLoadingForm(false);
                           }, 2000);
                        }
                     }}
                     className="mt-10 flex flex-col w-full gap-4"
                     action=""
                  >
                     <div className="flex flex-col w-full gap-1">
                        <label htmlFor="newPassword">Nueva Contraseña:</label>
                        <input
                           // required
                           className="bg-zinc-800 text-sm rounded px-4 py-1 outline-none "
                           type="password"
                           id="newPassword"
                           name="newPassword"
                        />
                     </div>
                     <div className="flex flex-col w-full gap-1">
                        <label htmlFor="confirmPassword">
                           Confirmar Contraseña:
                        </label>
                        <input
                           // required
                           className="bg-zinc-800 text-sm rounded px-4 py-1 outline-none "
                           type="password"
                           id="confirmPassword"
                           name="confirmPassword"
                        />
                     </div>

                     <button
                        disabled={loadingForm}
                        className="mt-6 w-full bg-[#CB993F] h-10 hover:bg-[#daad5b] rounded-md"
                     >
                        {loadingForm ? (
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
                           <p>Cambiar Contraseña</p>
                        )}
                     </button>
                  </form>
               </div>
            </div>
         </main>
      );
   }
};

export default Page;
