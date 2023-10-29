"use client";

import Link from "next/link";
import { BsArrowLeft, BsList } from "react-icons/bs";
import { AiOutlineCalendar, AiOutlineClose } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { FaBed, FaUserGroup, FaChevronLeft } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function SideBarPanelAdministracion() {
   const [currentPage, setCurrentPage] = useState<string>("");
   const [displaySideBar, setDisplaySideBar] = useState<string>("w-0");
   const [profileImage, setProfileImage] = useState<string>(
      "/profile-pictures/default-profile-photo.jpg"
   );
   const [backgroundColor, setBackgroundColor] = useState<string>("");

   const pathname = usePathname();
   const { data: session } = useSession();

   const getProfilePictureUrl = async () => {
      const response = await fetch("/api/get-profile-picture", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            username: session?.user?.name,
         }),
      });

      const result = await response.json();

      if (result.error) {
         Swal.fire({
            title: result.error,
            background: "#101010",
            color: "#fff",
            confirmButtonColor: "#CB993F",
         });
         signOut();

         return;
      }

      return result.imageUrl
         ? result.imageUrl
         : "/profile-pictures/default-profile-photo.jpg";
   };

   useEffect(() => {
      setCurrentPage(pathname);
   }, [pathname]);

   useEffect(() => {
      if (session) {
         (async () => {
            const imageUrl: any = await getProfilePictureUrl();

            setProfileImage(imageUrl);
         })();
      }
   }, [session]);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 20) {
            setBackgroundColor("bg-[rgba(0,0,0,0.75)]");
         } else {
            setBackgroundColor("bg-transparent");
         }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <>
         <header
            className={`flex ${backgroundColor} transition-all duration-300 h-auto fixed top-0 right-0 left-0 pl-8 w-full py-2 justify-between items-center pr-5`}
         >
            <BsList
               onClick={() => {
                  setDisplaySideBar("w-64");
               }}
               className="w-8 h-8 relative bottom-1 cursor-pointer"
            />
            <div className="flex items-center justify-center">
               <button
                  onClick={() => {
                     signOut();
                  }}
                  className="px-6 hidden sm:flex sm:items-center sm:justify-center rounded-lg bg-zinc-800 h-auto py-2"
               >
                  Cerrar Sesión
               </button>
               <Image
                  className="w-28"
                  src="/logo-hospedaje.png"
                  width={800}
                  height={800}
                  alt="logo hospedaje"
               />
            </div>
         </header>

         <aside
            className={`z-10 ${displaySideBar} overflow-hidden flex flex-col transition-all duration-500 fixed lg:sticky top-0 bottom-0 col-span-1 bg-zinc-900 h-screen`}
         >
            <div
               onClick={() => {
                  setDisplaySideBar("w-0");
               }}
               className="flex items-center cursor-pointer justify-center px-6 mt-8 gap-2 w-fit"
            >
               <FaChevronLeft className="w-4 h-4" />
               Ocultar
            </div>

            <div className="flex flex-col gap-4 items-center justify-center mt-8">
               <Image
                  className="w-20 rounded-full"
                  src={profileImage}
                  width={800}
                  height={800}
                  alt={`Foto de perfil de ${session?.user?.name}`}
               />
               <p>{session?.user?.name}</p>
            </div>

            <div className="mt-8">
               <Link
                  onClick={() => {
                     setDisplaySideBar("w-0");
                  }}
                  href="/panel-administracion"
                  className={`flex ${
                     currentPage === "/panel-administracion"
                        ? "bg-zinc-800"
                        : ""
                  } items-center gap-2 hover:bg-zinc-800 px-6 py-3`}
               >
                  <p className="text-xl font-medium">Principal</p>
               </Link>
               <Link
                  onClick={() => {
                     setDisplaySideBar("w-0");
                  }}
                  href="/panel-administracion/reservas"
                  className={`flex ${
                     currentPage === "/panel-administracion/reservas"
                        ? "bg-zinc-800"
                        : ""
                  } items-center gap-2 hover:bg-zinc-800 px-6 py-3`}
               >
                  <AiOutlineCalendar />
                  Reservas
               </Link>
               <Link
                  onClick={() => {
                     setDisplaySideBar("w-0");
                  }}
                  href="/panel-administracion/habitaciones"
                  className={`flex ${
                     currentPage === "/panel-administracion/habitaciones"
                        ? "bg-zinc-800"
                        : ""
                  } items-center gap-2 hover:bg-zinc-800 px-6 py-3`}
               >
                  <FaBed />
                  Habitaciones
               </Link>
               <Link
                  onClick={() => {
                     setDisplaySideBar("w-0");
                  }}
                  href="/panel-administracion/usuarios"
                  className={`flex ${
                     currentPage === "/panel-administracion/usuarios"
                        ? "bg-zinc-800"
                        : ""
                  } items-center gap-2 hover:bg-zinc-800 px-6 py-3`}
               >
                  <FaUserGroup />
                  Usuarios
               </Link>

               <div className="w-full flex items-center justify-center mt-8">
                  <button
                     onClick={() => {
                        signOut();
                     }}
                     className="px-6 hidden sm:flex sm:items-center sm:justify-center rounded-lg bg-zinc-700 h-auto py-2"
                  >
                     Cerrar Sesión
                  </button>
               </div>
            </div>
         </aside>
      </>
   );
}
