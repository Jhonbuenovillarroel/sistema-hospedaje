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

   // const obtenerReservas = async () => {
   //    const response = await fetch("/api/get-bookings");

   //    const result = await response.json();

   //    console.log(result);

   //    setBookings(result);
   // };

   // const deleteBooking = async (id: string) => {
   //    const response = await fetch("/api/delete-booking", {
   //       method: "POST",
   //       headers: {
   //          "Content-Type": "application/json",
   //       },
   //       body: JSON.stringify({
   //          id,
   //       }),
   //    });

   //    const result = await response.json();

   //    if (result.error) {
   //       Swal.fire({
   //          title: result.error,
   //          icon: "error",
   //          color: "#fff",
   //          background: "#101010",
   //          confirmButtonColor: "#CB993F",
   //       });
   //    } else if (result.booking) {
   //       Swal.fire({
   //          title: "Reserva eliminada correctamente",
   //          color: "#fff",
   //          background: "#101010",
   //          confirmButtonColor: "#CB993F",
   //          icon: "success",
   //       });
   //    }
   // };

   // useEffect(() => {
   //    (async () => {
   //       await obtenerReservas();
   //    })();
   // }, []);

   return (
      <>
         <BookingsTable bookings={bookings} />
      </>
   );
}
