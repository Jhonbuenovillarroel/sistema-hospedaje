import BookingsTable from "@/components/BookingsTable";
import { obtenerReservas } from "@/actions/get-bookings";

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

   return (
      <>
         <BookingsTable bookings={bookings} />
      </>
   );
}
