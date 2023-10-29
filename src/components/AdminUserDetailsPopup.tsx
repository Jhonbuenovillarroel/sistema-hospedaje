"use client";

import { User } from "@/app/panel-administracion/usuarios/page";
import Image from "next/image";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdDelete, MdOutlineEditNote } from "react-icons/md";
import Swal from "sweetalert2";

interface Props {
   username: string;
   email: string;
   imageUrl: string;
   imageName: string;
   setPopupTransform: Function;
   popupTransform: string;
   showAdminUserDetailsPopup: boolean;
   setShowAdminUserDetailsPopup: Function;
   setUserId: Function;
   setEdit: Function;
   setShowUserForm: Function;
   eliminarUsuario: Function;
   id: string;
   users: User[];
   setCurrentUser: Function;
}

const AdminUserDetailsPopup = ({
   username,
   email,
   imageUrl,
   imageName,
   popupTransform,
   setPopupTransform,
   showAdminUserDetailsPopup,
   setShowAdminUserDetailsPopup,
   setUserId,
   setEdit,
   setShowUserForm,
   eliminarUsuario,
   id,
   users,
   setCurrentUser,
}: Props) => {
   useEffect(() => {
      setPopupTransform("w-full h-full opacity-100");
   }, []);

   return (
      <div
         className={`max-w-[600px] overflow-y-scroll custom-scroll-bar z-10 ${popupTransform} transition-all duration-300 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center px-6 gap-6 py-16 flex flex-col bg-zinc-950 items-center border-b border-b-zinc-800`}
      >
         <AiOutlineClose
            onClick={() => {
               setPopupTransform("w-60 h-60 opacity-0");
               setTimeout(() => {
                  setShowAdminUserDetailsPopup(false);
               }, 100);
            }}
            className="absolute w-6 h-6 top-5 cursor-pointer right-5"
         />
         <div className="flex flex-col gap-1">
            <p className="font-bold text-lg">Usuario:</p>
            <p>{username}</p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold text-lg">Correo Electrónico:</p>
            <p>{email}</p>
         </div>
         <div className="flex flex-col gap-1">
            <p className="font-bold text-lg">Foto:</p>
            <Image
               className="w-24 h-24 rounded-full"
               src={imageUrl}
               width={800}
               height={800}
               alt={`Foto de perfil del usuario ${username}`}
            />
         </div>

         <div className="w-auto flex items-center justify-center">
            <div
               onClick={async () => {
                  Swal.fire({
                     title: "Estás seguro de que deseas eliminar a este usuario?",
                     color: "#fff",
                     icon: "question",
                     background: "#101010",
                     confirmButtonText: "Si, seguro",
                     confirmButtonColor: "#CB993F",
                     denyButtonText: "No, cancelar",
                     showDenyButton: true,
                  }).then(async (result) => {
                     if (result.isConfirmed) {
                        if (
                           email === "jhonadelbuenovillarroel@gmail.com" ||
                           email === "jhonbillbueno@gmail.com"
                        ) {
                           Swal.fire({
                              title: "No puedes eliminar a este usuario",
                              icon: "error",
                              color: "#fff",
                              background: "#101010",
                              confirmButtonColor: "#CB993F",
                           });
                           return;
                        }

                        if (users.length <= 1) {
                           Swal.fire({
                              title: "Tiene que haber un usuario como mínimo",
                              icon: "error",
                              color: "#fff",
                              background: "#101010",
                              confirmButtonColor: "#CB993F",
                           });
                           return;
                        }

                        const result = await eliminarUsuario(id, imageUrl);

                        if (result.error) {
                           Swal.fire({
                              title: result.error,
                              color: "#fff",
                              icon: "error",
                              background: "#101010",
                              confirmButtonText: "Ok",
                              confirmButtonColor: "#CB993F",
                           });
                        } else if (result.username) {
                           const responseDeleteImage = await fetch(
                              "/api/delete-images",
                              {
                                 method: "POST",
                                 headers: {
                                    "Content-Type": "application/json",
                                 },
                                 body: JSON.stringify({
                                    imageNames: [imageName],
                                 }),
                              }
                           );
                           Swal.fire({
                              title: `El usuario ${result.username} se eliminó correctamente`,
                              color: "#fff",
                              icon: "success",
                              background: "#101010",
                              confirmButtonText: "Ok",
                              confirmButtonColor: "#CB993F",
                           });
                        }
                     } else if (result.isDenied) {
                     }
                  });
               }}
               title="Eliminar"
               className="hover:bg-zinc-900 w-full p-3 flex items-center justify-center rounded-full cursor-pointer"
            >
               <MdDelete className="w-6 h-6 change-background-to-red" />
            </div>
            <div
               onClick={() => {
                  setCurrentUser(() => {
                     for (let i = 0; i < users.length; i++) {
                        if (users[i].id === id) {
                           return users[i];
                        }
                     }
                  });
                  setUserId(id);
                  setShowUserForm(true);
                  setEdit(true);
               }}
               title="Editar"
               className="hover:bg-zinc-900 w-full p-3 flex items-center justify-center rounded-full  cursor-pointer"
            >
               <MdOutlineEditNote className="w-7 h-7 change-background-to-yellow" />
            </div>
         </div>
      </div>
   );
};

export default AdminUserDetailsPopup;
