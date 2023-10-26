"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import NavBarPanelAdministracion from "@/components/SideBar-PanelAdministracion";
import Image from "next/image";

export default function PanelAdministracion() {
   return (
      <section className=" flex flex-col pt-32 lg:p-0 items-center justify-center w-full">
         <div className="flex flex-col text-center items-center justify-center w-full gap-8">
            <Image
               className="w-60"
               src="/logo-hospedaje.png"
               width={900}
               height={900}
               alt="logo hospedaje"
            />
            <p className="text-4xl font-semibold">
               Hospedaje &quot;El Rinconcito&quot;
            </p>
         </div>
      </section>
   );
}
