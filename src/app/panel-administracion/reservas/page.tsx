import BookingsTable from "@/components/BookingsTable";
import { obtenerReservas } from "@/actions/get-bookings";
import { cookies } from "next/headers";

export interface Booking {
   checkIn: string;
   checkOut: string;
   country: string;
   email: string;
   garage: boolean;
   id: string;
   lastname: string;
   name: string;
   phone: string;
   roomId: string;
   roomNumber: number;
   tours: boolean;
   roomPrice: number;
   roomName: string;
}

export default async function Reservas() {
   const bookings = await obtenerReservas();

   const cookieStore = cookies();

   console.log(cookieStore.getAll());

   return (
      <>
         <BookingsTable cookies={cookieStore.getAll()} bookings={bookings} />
      </>
   );
}
