"use client";

import { calculateMonth } from "@/utils/functions";
import Gallery from "@/components/Gallery";
import RoomForm from "@/components/RoomForm";
import { setDefaultResultOrder } from "dns/promises";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiPlusCircle } from "react-icons/bi";
import Swal from "sweetalert2";
import { MdDelete, MdOutlineEditNote } from "react-icons/md";
import RoomDetailsPopup from "@/components/RoomDetailsPopup";
import { Room } from "@/app/panel-administracion/habitaciones/page";
import { deleteRoom } from "@/actions/delete-room";
import { useGlobalContext } from "./Providers";

interface Props {
   rooms: Room[];
}

const RoomsTable = ({ rooms }: Props) => {
   const [addRoom, setAddRoom] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [currentRoom, setCurrentRoom] = useState<Room>({
      adults: 0,
      bed: "",
      category: "",
      children: 0,
      target: "",
      descriptionTitle: "",
      descriptionContent: "",
      id: "",
      name: "",
      price: 0,
      roomNumber: 0,
      view: "",
      amenities: [],
      imageUrls: [],
      imageNames: [],
   });
   const [edit, setEdit] = useState<boolean>(false);
   const [showRoomDetailsPopup, setShowRoomDetailsPopup] =
      useState<boolean>(false);
   const [popupTransform, setPopupTransform] = useState<string>(
      "w-60 h-60 opacity-0"
   );

   return (
      <section className="px-8 pt-24 pb-12 flex flex-col items-center justify-start w-full">
         {addRoom ? (
            <RoomForm
               edit={edit}
               currentRoom={edit ? currentRoom : { amenitiesLength: 1 }}
               setCurrentRoom={setCurrentRoom}
               loading={loading}
               setLoading={setLoading}
               setAddRoom={setAddRoom}
            />
         ) : (
            <>
               <div>
                  <button
                     onClick={() => {
                        setEdit(false);
                        setAddRoom(true);
                     }}
                     className="flex items-center justify-center gap-3 rounded-full h-14 px-6 text-white bg-zinc-800"
                  >
                     Agregar Habitación <BiPlusCircle className="w-5 h-5" />
                  </button>
               </div>
               <div className="mt-8">
                  <div className="max-w-[700px] text-center bg-[rgb(168,167,82)] rounded-tr-md rounded-tl-md py-4 gap-4 grid grid-cols-9 items-center justify-items-center">
                     <p className="col-span-5 sm:col-span-2">Nombre</p>
                     <p className="hidden sm:flex sm:items-center sm:justify-center sm:col-span-1">
                        N° de habitación
                     </p>
                     <p className="hidden sm:flex sm:items-center sm:justify-center sm:col-span-1">
                        Precio
                     </p>
                     <p className="hidden sm:flex sm:items-center sm:justify-center sm:col-span-3">
                        Imagen(es)
                     </p>
                     <p className="col-span-4 sm:col-span-2">Opciones</p>
                  </div>

                  {rooms && rooms.length !== 0 ? (
                     rooms.map((room: Room, i) => (
                        <div key={i}>
                           {showRoomDetailsPopup &&
                              currentRoom.id === room.id && (
                                 <RoomDetailsPopup
                                    popupTransform={popupTransform}
                                    setPopupTransform={setPopupTransform}
                                    setShowRoomDetailsPopup={
                                       setShowRoomDetailsPopup
                                    }
                                    name={room.name}
                                    roomNumber={room.roomNumber}
                                    price={room.price}
                                    id={room.id}
                                    imageUrls={room.imageUrls}
                                    deleteRoom={deleteRoom}
                                    setAddRoom={setAddRoom}
                                    setEdit={setEdit}
                                    setCurrentRoom={setCurrentRoom}
                                    room={room}
                                 />
                              )}
                           <div className="max-w-[700px] text-center gap-4 py-4 grid grid-cols-9 border-b border-b-zinc-800 items-center justify-center">
                              <p className="col-span-5 sm:col-span-2">
                                 {room.name}
                              </p>
                              <p className="hidden sm:flex sm:justify-center sm:col-span-1">
                                 {room.roomNumber}
                              </p>
                              <p className="hidden sm:flex sm:justify-center sm:col-span-1">
                                 {room.price}
                              </p>
                              <div className="hidden sm:col-span-3  sm:flex justify-center items-center">
                                 <Gallery
                                    width="max-w-[220px]"
                                    displacement={320}
                                 >
                                    {room.imageUrls &&
                                       room.imageUrls.map((urlImage, i) => (
                                          <Image
                                             key={i}
                                             className="h-fit w-full snap-center object-cover"
                                             src={
                                                urlImage
                                                   ? urlImage
                                                   : "/fotos__hospedaje/default-image-room.png"
                                             }
                                             width={350}
                                             height={350}
                                             alt={room.name}
                                          />
                                       ))}
                                 </Gallery>
                              </div>
                              <div className="col-span-4 sm:col-span-2 flex w-full gap-0 items-center justify-center">
                                 <div className="flex sm:hidden items-center justify-center w-full">
                                    <div
                                       onClick={() => {
                                          setShowRoomDetailsPopup(true);
                                          setCurrentRoom(room);
                                       }}
                                       className="hover:bg-zinc-800 rounded-full p-3 cursor-pointer"
                                    >
                                       <BsThreeDotsVertical className="" />
                                    </div>
                                 </div>
                                 <div
                                    onClick={async () => {
                                       Swal.fire({
                                          title: "Estás seguro de que deseas eliminar esta habitación?",
                                          color: "#fff",
                                          icon: "question",
                                          background: "#101010",
                                          confirmButtonText: "Si, seguro",
                                          confirmButtonColor: "#CB993F",
                                          denyButtonText: "No, cancelar",
                                          showDenyButton: true,
                                       }).then(async (result) => {
                                          if (result.isConfirmed) {
                                             const responseBookings =
                                                await fetch(
                                                   "/api/get-room-bookings",
                                                   {
                                                      method: "POST",
                                                      headers: {
                                                         "Content-Type":
                                                            "application/json",
                                                      },
                                                      body: JSON.stringify({
                                                         id: room.id,
                                                      }),
                                                   }
                                                );

                                             const result =
                                                await responseBookings.json();

                                             if (result.bookings) {
                                                Swal.fire({
                                                   title: "Hay huéspedes que ya reservaron esta habitación",
                                                   text: "Estás seguro de que deseas eliminarla? Se eliminará la habitación y todas sus reservas",
                                                   color: "#fff",
                                                   icon: "question",
                                                   background: "#101010",
                                                   confirmButtonText:
                                                      "Si, seguro",
                                                   confirmButtonColor:
                                                      "#CB993F",
                                                   denyButtonText:
                                                      "No, cancelar",
                                                   showDenyButton: true,
                                                }).then(async (result) => {
                                                   const resultDeleteRoom =
                                                      await deleteRoom(room.id);

                                                   if (resultDeleteRoom.error) {
                                                      Swal.fire({
                                                         title: resultDeleteRoom.error,
                                                         color: "#fff",
                                                         icon: "error",
                                                         background: "#101010",
                                                         confirmButtonText:
                                                            "Ok",
                                                         confirmButtonColor:
                                                            "#CB993F",
                                                      });
                                                   } else if (
                                                      resultDeleteRoom.room
                                                   ) {
                                                      const responseDeleteImage =
                                                         await fetch(
                                                            "/api/delete-images",
                                                            {
                                                               method: "POST",
                                                               headers: {
                                                                  "Content-Type":
                                                                     "application/json",
                                                               },
                                                               body: JSON.stringify(
                                                                  {
                                                                     imageNames:
                                                                        room.imageNames,
                                                                  }
                                                               ),
                                                            }
                                                         );
                                                      Swal.fire({
                                                         title: `La habitación ${resultDeleteRoom.room.name} se eliminó correctamente`,
                                                         color: "#fff",
                                                         icon: "success",
                                                         background: "#101010",
                                                         confirmButtonText:
                                                            "Ok",
                                                         confirmButtonColor:
                                                            "#CB993F",
                                                      });
                                                   }
                                                });
                                             } else {
                                                const resultDeleteRoom =
                                                   await deleteRoom(room.id);

                                                if (resultDeleteRoom.error) {
                                                   Swal.fire({
                                                      title: resultDeleteRoom.error,
                                                      color: "#fff",
                                                      icon: "error",
                                                      background: "#101010",
                                                      confirmButtonText: "Ok",
                                                      confirmButtonColor:
                                                         "#CB993F",
                                                   });
                                                } else if (
                                                   resultDeleteRoom.room
                                                ) {
                                                   const responseDeleteImage =
                                                      await fetch(
                                                         "/api/delete-images",
                                                         {
                                                            method: "POST",
                                                            headers: {
                                                               "Content-Type":
                                                                  "application/json",
                                                            },
                                                            body: JSON.stringify(
                                                               {
                                                                  imageNames:
                                                                     room.imageNames,
                                                               }
                                                            ),
                                                         }
                                                      );
                                                   Swal.fire({
                                                      title: `La habitación ${resultDeleteRoom.room.name} se eliminó correctamente`,
                                                      color: "#fff",
                                                      icon: "success",
                                                      background: "#101010",
                                                      confirmButtonText: "Ok",
                                                      confirmButtonColor:
                                                         "#CB993F",
                                                   });
                                                }
                                             }
                                          } else if (result.isDenied) {
                                          }
                                       });
                                    }}
                                    title="Eliminar"
                                    className="hidden sm:flex hover:bg-zinc-900 rounded-full p-3 cursor-pointer"
                                 >
                                    <MdDelete className="w-6 h-6 change-background-to-red" />
                                 </div>
                                 <div
                                    onClick={() => {
                                       setAddRoom(true);
                                       setEdit(true);
                                       setCurrentRoom(room);
                                    }}
                                    title="Editar"
                                    className="hidden sm:flex hover:bg-zinc-900 rounded-full p-3 cursor-pointer"
                                 >
                                    <MdOutlineEditNote className="w-7 h-7 change-background-to-yellow" />
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))
                  ) : (
                     <p className="text-center py-9">
                        No hay ninguna habitación en la base de datos
                     </p>
                  )}
               </div>
            </>
         )}
      </section>
   );
};

export default RoomsTable;
