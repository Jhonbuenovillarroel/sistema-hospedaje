import { deleteFile } from "@/utils/functions";
import Image from "next/image";
import React, { useEffect } from "react";

import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdOutlineEditNote } from "react-icons/md";
import Swal from "sweetalert2";

interface Props {
   setAddRoom: Function;
   loading: boolean;
   setLoading: Function;
   currentRoom: any;
   setCurrentRoom: Function;
   edit?: boolean;
}

const RoomForm = ({
   edit,
   loading,
   currentRoom,
   setCurrentRoom,
   setAddRoom,
   setLoading,
}: Props) => {
   const [amenitieInputs, setAmenitieInputs] = useState<string[]>([""]);
   const [images, setImages] = useState<File[]>([]);
   const [amenitiesLength, setAmenitiesLength] = useState<number>(0);

   useEffect(() => {
      if (currentRoom.amenities) {
         setAmenitieInputs(() => {
            return currentRoom.amenities;
         });
         setCurrentRoom({
            ...currentRoom,
            amenitiesLength: currentRoom.amenities.length,
         });
         setAmenitiesLength(currentRoom.amenities.length);
      }
   }, []);

   useEffect(() => {
      if (amenitiesLength) {
         const newArray = [];
         for (let i = 0; i < amenitiesLength; i++) {
            newArray.push(amenitieInputs[i]);
         }
         setAmenitieInputs(newArray);
      }
   }, [amenitiesLength]);

   return (
      <section className="">
         <section className="">
            <div className="mt-20 flex flex-col items-center justify-center">
               <p className="text-3xl font-medium text-center">
                  Agrega una Habitación
               </p>
               <form
                  className="bg-zinc-900 mt-8 px-6 py-8 sm:px-12 sm:py-16 w-full max-w-[300px] sm:max-w-[480px] flex flex-col items-center justify-center gap-6"
                  onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                     e.preventDefault();

                     const allowedExtensions = [".jpg", ".jpeg", ".png"];

                     for (let i = 0; i < images.length; i++) {
                        const fileExtension =
                           "." + images[i].name.split(".").pop()?.toLowerCase();
                        if (!allowedExtensions.includes(fileExtension)) {
                           toast.error("Sólo puedes subir imagenes", {
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
                     }

                     setLoading(true);

                     const formData = new FormData(e.currentTarget);
                     formData.delete("images");

                     const imageUrlForm = new FormData();

                     for (let i = 0; i < images.length; i++) {
                        imageUrlForm.append(`image${i + 1}`, images[i]);
                     }
                     imageUrlForm.append("folderPath", "/fotos__hospedaje");

                     const imageUrlsResponse = await fetch(
                        "/api/upload-images",
                        {
                           method: "POST",
                           body: imageUrlForm,
                        }
                     );

                     const imageUrls = await imageUrlsResponse.json();

                     if (imageUrls.error) {
                        toast.error(imageUrls.error, {
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
                        return;
                     }

                     let amenities = [];

                     for (let i = 1; i < amenitieInputs.length + 1; i++) {
                        amenities.push(formData.get(`amenitie${i}`));
                     }

                     if (edit) {
                        const updatedRoomResponse = await fetch(
                           "/api/edit-room",
                           {
                              method: "POST",
                              headers: {
                                 "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                 id: currentRoom.id,
                                 name: formData.get("name"),
                                 description: formData.get("description"),
                                 roomNumber: formData.get("roomNumber"),
                                 adults: formData.get("adults"),
                                 children: formData.get("children"),
                                 amenities,
                                 view: formData.get("view"),
                                 bed: formData.get("bed"),
                                 category: formData.get("category"),
                                 price: formData.get("price"),
                                 images: imageUrls,
                              }),
                           }
                        );

                        const updatedRoom = await updatedRoomResponse.json();

                        if (updatedRoom.error) {
                           toast.error(imageUrls.error, {
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
                        } else if (updatedRoom.room) {
                           toast.success(
                              "Habitación actualizada correctamente",
                              {
                                 style: {
                                    color: "#000",
                                 },
                              }
                           );

                           setTimeout(() => {
                              setLoading(false);
                              setAddRoom(false);
                           }, 2000);
                        }
                     } else {
                        const newRoomResponse = await fetch("/api/add-room", {
                           method: "POST",
                           headers: {
                              "Content-Type": "application/json",
                           },
                           body: JSON.stringify({
                              name: formData.get("name"),
                              description: formData.get("description"),
                              roomNumber: formData.get("roomNumber"),
                              adults: formData.get("adults"),
                              children: formData.get("children"),
                              amenities,
                              view: formData.get("view"),
                              bed: formData.get("bed"),
                              category: formData.get("category"),
                              price: formData.get("price"),
                              images: imageUrls,
                           }),
                        });

                        const newRoom = await newRoomResponse.json();

                        if (newRoom.error) {
                           toast.error(imageUrls.error, {
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
                        } else if (newRoom.room) {
                           toast.success("Habitación agregada correctamente", {
                              style: {
                                 color: "#000",
                              },
                           });

                           setTimeout(() => {
                              setLoading(false);
                              setAddRoom(false);
                           }, 2000);
                        }
                     }
                  }}
               >
                  <div className="flex flex-col w-full gap-1 mt-4">
                     <label htmlFor="name">Nombre:</label>
                     <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setCurrentRoom({
                              ...currentRoom,
                              name: e.currentTarget.value,
                           });
                        }}
                        value={currentRoom.name}
                        required
                        className="outline-none bg-zinc-800 rounded-sm h-9 px-3"
                        type="text"
                        name="name"
                        id="name"
                     />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                     <label htmlFor="description">Descripción:</label>
                     <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setCurrentRoom({
                              ...currentRoom,
                              description: e.currentTarget.value,
                           });
                        }}
                        value={currentRoom.description}
                        required
                        className="outline-none bg-zinc-800 rounded-sm h-9 px-3"
                        type="text"
                        name="description"
                        id="description"
                     />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                     <label htmlFor="roomNumber">Número de Habitación:</label>
                     <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setCurrentRoom({
                              ...currentRoom,
                              roomNumber: e.currentTarget.value,
                           });
                        }}
                        value={currentRoom.roomNumber}
                        required
                        className="outline-none bg-zinc-800 rounded-sm h-9 px-3"
                        type="number"
                        name="roomNumber"
                        id="roomNumber"
                     />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                     <label htmlFor="adults">Adultos:</label>
                     <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setCurrentRoom({
                              ...currentRoom,
                              adults: e.currentTarget.value,
                           });
                        }}
                        value={currentRoom.adults}
                        required
                        className="outline-none bg-zinc-800 rounded-sm h-9 px-3"
                        type="number"
                        name="adults"
                        id="adults"
                     />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                     <label htmlFor="children">Niños:</label>
                     <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setCurrentRoom({
                              ...currentRoom,
                              children: e.currentTarget.value,
                           });
                        }}
                        value={currentRoom.children}
                        required
                        className="outline-none bg-zinc-800 rounded-sm h-9 px-3"
                        type="number"
                        name="children"
                        id="children"
                     />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                     <label htmlFor="amenities">Comodidades:</label>
                     <select
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                           setAmenitiesLength(parseInt(e.currentTarget.value));
                           setCurrentRoom({
                              ...currentRoom,
                              amenitiesLength,
                           });
                        }}
                        value={amenitieInputs.length}
                        className="bg-zinc-800 rounded-sm h-9 px-3"
                        name="amenities"
                        id="amenities"
                     >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                     </select>

                     {amenitieInputs &&
                        amenitieInputs.map((element, i) => (
                           <div key={i} className="mt-4">
                              <div className="flex flex-col w-full gap-1">
                                 <label htmlFor={`amenitie${i + 1}`}>
                                    Comodidad {i + 1}
                                 </label>
                                 <input
                                    onChange={(
                                       e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                       const newArray = amenitieInputs;

                                       newArray[i] = e.currentTarget.value;

                                       setCurrentRoom({
                                          ...currentRoom,
                                          amenities: newArray,
                                       });
                                    }}
                                    value={element}
                                    required
                                    className="outline-none bg-zinc-800 rounded-sm h-9 px-3"
                                    type="text"
                                    name={`amenitie${i + 1}`}
                                    id={`amenitie${i + 1}`}
                                 />
                              </div>
                           </div>
                        ))}
                  </div>

                  <div className="flex flex-col w-full gap-1">
                     <label htmlFor="view">Vista:</label>
                     <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setCurrentRoom({
                              ...currentRoom,
                              view: e.currentTarget.value,
                           });
                        }}
                        value={currentRoom.view}
                        required
                        className="outline-none bg-zinc-800 rounded-sm h-9 px-3"
                        type="text"
                        name="view"
                        id="view"
                     />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                     <label htmlFor="bed">Tipo de Cama (plazas):</label>
                     <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setCurrentRoom({
                              ...currentRoom,
                              bed: e.currentTarget.value,
                           });
                        }}
                        value={currentRoom.bed}
                        required
                        className="outline-none bg-zinc-800 rounded-sm h-9 px-3"
                        type="text"
                        name="bed"
                        id="bed"
                     />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                     <label htmlFor="category">Categoría:</label>

                     <select
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                           setCurrentRoom({
                              ...currentRoom,
                              category: e.currentTarget.value,
                           });
                        }}
                        value={currentRoom.category}
                        required
                        className="outline-none bg-zinc-800 rounded-sm h-9 px-3"
                        name="category"
                        id="category"
                     >
                        <option value="Habitación Estándar">
                           Habitación Estándar
                        </option>
                        <option value="Habitación Matrimonial Clásica">
                           Habitación Matrimonial Clásica
                        </option>
                        <option value="Habitación Matrimonial Elegante">
                           Habitación Matrimonial Elegante
                        </option>
                        <option value="Habitación Matrimonial Superior">
                           Habitación Matrimonial Superior
                        </option>
                        <option value="Habitación Doble">
                           Habitación Doble
                        </option>
                        <option value="Habitación Triple">
                           Habitación Triple
                        </option>
                     </select>
                  </div>

                  <div className="flex flex-col w-full gap-1">
                     <label htmlFor="price">Precio:</label>
                     <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setCurrentRoom({
                              ...currentRoom,
                              price: e.currentTarget.value,
                           });
                        }}
                        value={currentRoom.price}
                        required
                        className="outline-none bg-zinc-800 rounded-sm h-9 px-3"
                        type="number"
                        name="price"
                        id="price"
                     />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                     <label htmlFor="images">Imagenes:</label>
                     <input
                        required={edit ? false : true}
                        type="file"
                        multiple
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           const filesLength: any =
                              e.currentTarget.files?.length;

                           let arrayImages: any = [];

                           for (let i = 0; i < filesLength; i++) {
                              arrayImages.push(e.currentTarget.files?.item(i));
                           }

                           setImages(arrayImages);
                        }}
                        className="bg-zinc-800 cursor-pointer rounded-sm h-9 px-3"
                        name="images"
                        id="images"
                     />
                  </div>

                  <div className="flex relative gap-8 flex-wrap items-center justify-center">
                     {currentRoom.images ? (
                        currentRoom.images.map((element: any, i: any) => (
                           <div key={i} className="max-w-[288px] relative">
                              <div
                                 onClick={async () => {
                                    Swal.fire({
                                       title: "Seguro que quieres eliminar esta imagen?",
                                       icon: "question",
                                       color: "#fff",
                                       background: "#101010",
                                       confirmButtonText: "Si",
                                       confirmButtonColor: "#CB993F",
                                       denyButtonText: "No, cancelar",
                                       showDenyButton: true,
                                       denyButtonColor: "#303030",
                                    }).then(async (res) => {
                                       if (res.isConfirmed) {
                                          if (currentRoom.images.length === 1) {
                                             Swal.fire({
                                                title: "No puede eliminar esta imagen",
                                                text: "Cada habitación tiene que tener por lo menos una imagen",
                                                icon: "error",
                                                color: "#fff",
                                                background: "#101010",
                                                confirmButtonText: "Ok",
                                                confirmButtonColor: "#CB993F",
                                             });
                                             return;
                                          }
                                          const response = await fetch(
                                             "/api/delete-room-image",
                                             {
                                                method: "POST",
                                                headers: {
                                                   "Content-Type":
                                                      "application/json",
                                                },
                                                body: JSON.stringify({
                                                   urlImage: element,
                                                }),
                                             }
                                          );

                                          const result = await response.json();

                                          if (result.error) {
                                             Swal.fire({
                                                title: result.error,
                                                icon: "error",
                                                color: "#fff",
                                                background: "#101010",
                                                confirmButtonText: "Ok",
                                                confirmButtonColor: "#CB993F",
                                             });
                                          } else if (result.image) {
                                             Swal.fire({
                                                title: "La imagen se eliminó correctamente",
                                                icon: "success",
                                                color: "#fff",
                                                background: "#101010",
                                                confirmButtonText: "Ok",
                                                confirmButtonColor: "#CB993F",
                                             });
                                          }
                                       }
                                    });
                                 }}
                                 className="bg-[rgba(0,0,0,0.5)] cursor-pointer p-2 absolute right-4 top-4 rounded-full"
                              >
                                 <MdDelete className="w-6 h-6 change-background-to-red" />
                              </div>

                              <Image
                                 className="w-full"
                                 src={element}
                                 width={400}
                                 height={400}
                                 alt={`Imagen de ${currentRoom.name}`}
                              />
                           </div>
                        ))
                     ) : (
                        <div></div>
                     )}
                  </div>

                  <div className="flex flex-col w-full items-center justify-center">
                     <button className="bg-[#CB993F] flex items-center justify-center hover:scale-110 transition-all duration-300 mt-6 w-full h-10 rounded-full">
                        {loading && loading ? (
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
                        ) : edit ? (
                           <p>Guardar Cambios</p>
                        ) : (
                           <p>Agregar Habitación</p>
                        )}
                     </button>
                     <button
                        type="button"
                        onClick={() => {
                           setLoading(false);
                           setAddRoom(false);
                        }}
                        className="bg-zinc-800 flex items-center justify-center hover:scale-110 transition-all duration-300 mt-6 w-full h-10 rounded-full"
                     >
                        Cancelar
                     </button>
                  </div>
               </form>
            </div>
         </section>
      </section>
   );
};

export default RoomForm;
