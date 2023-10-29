"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import Loading from "@/app/loading";

interface AvailableRoom {
   id: string;
   name: string;
   roomNumber: number;
   description: string;
   adults: number;
   children: number;
   view: string;
   bed: string;
   category: string;
   price: number;
   amenities: string[];
   images: string[];
}

export type GlobalContent = {
   availableRooms: AvailableRoom[];
   updateAvailableRooms: Function;
   theme: string;
   setTheme: Function;
};

interface Props {
   children: React.ReactNode;
   session: Session;
}

export const MyGlobalContext = createContext<GlobalContent>({
   availableRooms: [],
   updateAvailableRooms: () => {},
   theme: "light",
   setTheme: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);

export default function Providers({ children, session }: Props) {
   const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
   const updateAvailableRooms = (rooms: AvailableRoom[]) => {
      setAvailableRooms(rooms);
   };
   const [theme, setTheme] = useState<string>("light");

   // useEffect(() => {
   //    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
   //       setTheme("dark");
   //    }
   // }, []);

   useEffect(() => {
      if (theme === "dark") {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }
   }, [theme]);

   return (
      <MyGlobalContext.Provider
         value={{
            availableRooms,
            updateAvailableRooms,
            theme,
            setTheme,
         }}
      >
         <SessionProvider session={session}>{children}</SessionProvider>
      </MyGlobalContext.Provider>
   );
}
