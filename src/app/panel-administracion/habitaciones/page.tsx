import RoomsTable from "@/components/RoomsTable";
import { getRooms } from "@/actions/get-rooms";
import { cookies } from "next/headers";

export interface Room {
   adults: number;
   bed: string;
   category: string;
   children: number;
   description: string;
   id: string;
   name: string;
   price: number;
   roomNumber: number;
   view: string;
   amenities: string[];
   images: string[];
}

export default async function Habitaciones() {
   const rooms: Room[] = await getRooms();

   const cookieStore = cookies();

   return <RoomsTable rooms={rooms} />;
}
