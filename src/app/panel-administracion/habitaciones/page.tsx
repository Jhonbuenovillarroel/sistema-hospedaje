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

   // const deleteRoom = async (id: any, imageUrls: any) => {
   //    const response = await fetch("/api/delete-room", {
   //       method: "POST",
   //       headers: {
   //          "Content-Type": "application/json",
   //       },
   //       body: JSON.stringify({ id, imageUrls }),
   //    });

   //    const result = await response.json();

   //    if (result.error) {
   //       Swal.fire({
   //          title: result.error,
   //          color: "#fff",
   //          icon: "error",
   //          background: "#101010",
   //          confirmButtonText: "Ok",
   //          confirmButtonColor: "#CB993F",
   //       });
   //    } else if (result.room) {
   //       Swal.fire({
   //          title: `La habitación ${result.room.name} se eliminó correctamente`,
   //          color: "#fff",
   //          icon: "success",
   //          background: "#101010",
   //          confirmButtonText: "Ok",
   //          confirmButtonColor: "#CB993F",
   //       });
   //    }

   //    return result;
   // };

   return <RoomsTable rooms={rooms} />;
}
