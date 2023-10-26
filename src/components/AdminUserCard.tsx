import Image from "next/image";
import Swal from "sweetalert2";
import { MdDelete, MdOutlineEditNote } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Booking } from "@/app/panel-administracion/reservas/page";
import { useState } from "react";
import AdminUserDetailsPopup from "./AdminUserDetailsPopup";
import { User } from "@/app/panel-administracion/usuarios/page";

interface Props {
   username: string;
   email: string;
   image: string;
   id: string;
   setUserId: Function;
   setEdit: Function;
   setShowUserForm: Function;
   eliminarUsuario: Function;
   users: User[];
}

const AdminUserCard = ({
   username,
   email,
   image,
   id,
   setUserId,
   setEdit,
   setShowUserForm,
   eliminarUsuario,
   users,
}: Props) => {
   const [showAdminUserDetailsPopup, setShowAdminUserDetailsPopup] =
      useState<boolean>(false);
   const [popupTransform, setPopupTransform] = useState<string>(
      "w-60 h-60 opacity-0"
   );

   return (
      <>
         {showAdminUserDetailsPopup && (
            <AdminUserDetailsPopup
               showAdminUserDetailsPopup={showAdminUserDetailsPopup}
               setShowAdminUserDetailsPopup={setShowAdminUserDetailsPopup}
               popupTransform={popupTransform}
               setPopupTransform={setPopupTransform}
               username={username}
               email={email}
               image={image}
               id={id}
               setUserId={setUserId}
               setEdit={setEdit}
               setShowUserForm={setShowUserForm}
               eliminarUsuario={eliminarUsuario}
               users={users}
            />
         )}

         <div className="max-w-[800px] text-center px-6 gap-3 py-4 grid items-center justify-items-center grid-cols-6 border-b border-b-zinc-800">
            <p className="col-span-3 sm:col-span-1">{`${username}`}</p>
            <p className="hidden sm:flex sm:items-center sm:justify-center col-span-3">
               {email}
            </p>
            <Image
               className="hidden sm:flex sm:items-center sm:justify-center rounded-full justify-self-center w-14 h-14 object-cover col-span-1"
               src={
                  image ? image : "/profile-pictures/default-profile-photo.jpg"
               }
               width={100}
               height={100}
               alt={`Foto de perfil de ${username}`}
            />
            <div className="col-span-3 sm:col-span-1 w-full flex items-center justify-center">
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

                           const result = await eliminarUsuario(id, image);

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
                                       imageUrls: [image],
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
                  className="hover:bg-zinc-900 w-full hidden p-3 sm:flex sm:items-center sm:justify-center rounded-full cursor-pointer"
               >
                  <MdDelete className="w-6 h-6 change-background-to-red" />
               </div>
               <div
                  onClick={() => {
                     setUserId(id);
                     setShowUserForm(true);
                     setEdit(true);
                  }}
                  title="Editar"
                  className="hover:bg-zinc-900 w-full hidden p-3 sm:flex sm:items-center sm:justify-center rounded-full  cursor-pointer"
               >
                  <MdOutlineEditNote className="w-7 h-7 change-background-to-yellow" />
               </div>

               <div className="flex sm:hidden items-center justify-center w-full">
                  <div
                     onClick={() => {
                        setShowAdminUserDetailsPopup(true);
                     }}
                     className="hover:bg-zinc-800 p-3 rounded-full  cursor-pointer"
                  >
                     <BsThreeDotsVertical className="" />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default AdminUserCard;
