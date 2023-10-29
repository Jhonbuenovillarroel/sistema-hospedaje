"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

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
};

interface Props {
   children: React.ReactNode;
   session: Session;
}

export const MyGlobalContext = createContext<GlobalContent>({
   availableRooms: [],
   updateAvailableRooms: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);

export default function Providers({ children, session }: Props) {
   const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
   const updateAvailableRooms = (rooms: AvailableRoom[]) => {
      setAvailableRooms(rooms);
   };
   const [toggleTheme, setToggleTheme] = useState<string>("light");

   useEffect(() => {
      localStorage.removeItem("name");
      console.log(localStorage);
   }, []);

   return (
      <MyGlobalContext.Provider
         value={{
            availableRooms,
            updateAvailableRooms,
         }}
      >
         <SessionProvider session={session}>{children}</SessionProvider>
      </MyGlobalContext.Provider>
   );
}
