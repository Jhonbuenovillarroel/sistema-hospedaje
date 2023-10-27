import { Image } from "@prisma/client";
import React, { ChangeEvent, FormEvent, use, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { User } from "@/app/panel-administracion/usuarios/page";

interface Props {
   setShowUserForm: Function;
   setCurrentUser?: any;
   currentUser?: User;
   edit: boolean;
   userId: string;
}

const AdminUserForm = ({
   setShowUserForm,
   setCurrentUser,
   currentUser,
   edit,
   userId,
}: Props) => {
   const [images, setImages] = useState<File[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

   const router = useRouter();

   return (
      <form
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

            const formData: FormData = new FormData(e.currentTarget);
            formData.delete("images");
            const imagesForm = new FormData();
            for (let i = 0; i < images.length; i++) {
               imagesForm.append(`image${i + 1}`, images[i]);
            }
            imagesForm.append("folderPath", "/profile-pictures");
            const imagesDataResponse = await fetch("/api/upload-images", {
               method: "POST",
               body: imagesForm,
            });

            const imagesData = await imagesDataResponse.json();

            if (imagesData.error) {
               toast.error(imagesData.error, {
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

            const response = await fetch(
               edit
                  ? "/api/edit-administrator-user"
                  : "/api/register-administrator-user",
               {
                  method: "POST",
                  body: JSON.stringify({
                     username: currentUser?.username,
                     email: currentUser?.email,
                     password: currentUser?.password,
                     imagesData: imagesData,
                     userId,
                  }),
               }
            );

            const result = await response.json();

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
            }
            if (result.user) {
               toast.success(
                  edit
                     ? "Se guardaron los cambios"
                     : "Usuario agregado correctamente",
                  {
                     style: {
                        color: "#000",
                     },
                  }
               );

               setTimeout(() => {
                  setShowUserForm(false);
                  setLoading(false);
               }, 2000);
            }
         }}
         className="flex max-w-[400px] w-full flex-col gap-4 bg-zinc-900 rounded-md py-8 px-8 items-center justify-center"
      >
         <h2 className="text-2xl font-medium">Datos de Usuario</h2>
         <div className="flex w-full flex-col gap-1 mt-6">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setCurrentUser({
                     ...currentUser,
                     username: e.currentTarget.value,
                  });
               }}
               value={currentUser?.username}
               required
               type="text"
               id="username"
               name="username"
               className="bg-zinc-800 rounded-sm outline-none px-3 py-1"
            />
         </div>
         <div className="flex w-full flex-col gap-1">
            <label htmlFor="email">Correo Electrónico</label>
            <input
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setCurrentUser({
                     ...currentUser,
                     email: e.currentTarget.value,
                  });
               }}
               value={currentUser?.email}
               required
               type="email"
               id="email"
               name="email"
               className="bg-zinc-800 rounded-sm outline-none px-3 py-1"
            />
         </div>
         <div className="flex w-full flex-col gap-1">
            <label htmlFor="password">
               {edit ? "Nueva Contraseña" : "Contraseña"}
            </label>
            <input
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setCurrentUser({
                     ...currentUser,
                     password: e.currentTarget.value,
                  });
               }}
               value={currentUser?.password}
               required={edit ? false : true}
               type="password"
               id="password"
               name="password"
               className="bg-zinc-800 rounded-sm outline-none px-3 py-1"
            />
         </div>
         <div className="flex w-full flex-col gap-1">
            <label htmlFor="images">
               {edit ? "Nueva Foto de Perfil" : "Foto de Perfil"}
            </label>
            <input
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const filesLength: any = e.currentTarget.files?.length;

                  let arrayImages: any = [];

                  for (let i = 0; i < filesLength; i++) {
                     arrayImages.push(e.currentTarget.files?.item(i));
                  }

                  setImages(arrayImages);
               }}
               type="file"
               id="images"
               name="images"
               className="bg-zinc-800 rounded-sm outline-none px-3 py-1"
            />
         </div>

         <div className="flex w-full flex-col gap-4 mt-6">
            <button
               disabled={loading}
               className="h-11 bg-[#CB993F] rounded-md w-full flex items-center justify-center"
            >
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
                  <p>Agregar Usuario</p>
               )}
            </button>
            <button
               type="button"
               onClick={() => {
                  setShowUserForm(false);
               }}
               className="h-11 bg-zinc-700 rounded-md w-full"
            >
               Cancelar
            </button>
         </div>
      </form>
   );
};

export default AdminUserForm;
