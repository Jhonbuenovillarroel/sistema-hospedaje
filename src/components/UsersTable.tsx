"use client";

import { User } from "@/app/panel-administracion/usuarios/page";
import AdminUserCard from "@/components/AdminUserCard";
import AdminUserForm from "@/components/AdminUserForm";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import { eliminarUsuario } from "@/actions/delete-admin-user";

interface Props {
   users: User[];
}

const UsersTable = ({ users }: Props) => {
   const [showUserForm, setShowUserForm] = useState<boolean>(false);
   const [edit, setEdit] = useState<boolean>(false);
   const [userId, setUserId] = useState<string>("");
   const [currentUser, setCurrentUser] = useState<User>({
      username: "",
      email: "",
      image: "",
      id: "",
      password: "",
   });

   return (
      <section className="px-8 pt-24 pb-12 flex flex-col items-center justify-start w-full gap-10">
         {showUserForm ? (
            <AdminUserForm
               edit={edit}
               setCurrentUser={setCurrentUser}
               userId={userId ? userId : ""}
               currentUser={currentUser}
               setShowUserForm={setShowUserForm}
            />
         ) : (
            <>
               <div>
                  <button
                     onClick={() => {
                        setEdit(false);
                        setShowUserForm(true);
                        setCurrentUser({
                           username: "",
                           email: "",
                           image: "",
                           id: "",
                           password: "",
                        });
                     }}
                     className="flex items-center justify-center gap-2 rounded-full h-14 px-6 text-white bg-zinc-800"
                  >
                     Agregar Usuario <FaUserPlus className="w-5 h-5" />
                  </button>
               </div>
               <div className="">
                  <div className="max-w-[800px] text-center bg-[rgb(155,152,74)] rounded-tr-md rounded-tl-md py-4 px-6 gap-3 grid grid-cols-6 items-center justify-items-center">
                     <p className="col-span-3 sm:flex sm:items-center sm:justify-center sm:col-span-1">
                        Usuario
                     </p>
                     <p className="hidden sm:flex sm:items-center sm:justify-center col-span-3">
                        Email
                     </p>
                     <p className="hidden sm:flex sm:items-center sm:justify-center col-span-1">
                        Foto
                     </p>
                     <p className="col-span-3 sm:col-span-1">Opciones</p>
                  </div>

                  {users &&
                     users.map((element: User, i) => (
                        <AdminUserCard
                           key={i}
                           users={users}
                           username={element.username}
                           email={element.email}
                           image={element.image}
                           id={element.id}
                           setUserId={setUserId}
                           setEdit={setEdit}
                           setShowUserForm={setShowUserForm}
                           eliminarUsuario={eliminarUsuario}
                        />
                     ))}
               </div>
            </>
         )}
      </section>
   );
};

export default UsersTable;
