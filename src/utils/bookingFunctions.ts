import { calculateLaterDate } from "@/app/api/get-available-rooms/route";
import { Booking } from "@/app/panel-administracion/reservas/page";

export const sortBookings = (bookings: Booking[]) => {
   const bookingsAreOrdered = (bookings: Booking[]) => {
      let isOrdered = false;

      for (let i = 0; i < bookings.length - 1; i++) {
         if (
            calculateLaterDate(bookings[i].checkIn, bookings[i + 1].checkIn) ===
               bookings[i + 1].checkIn ||
            calculateLaterDate(bookings[i].checkIn, bookings[i + 1].checkIn) ===
               "son iguales"
         ) {
            isOrdered = true;
         } else {
            isOrdered = false;
         }

         if (!isOrdered) {
            return false;
         }
      }

      return isOrdered;
   };

   if (bookings.length > 1) {
      while (!bookingsAreOrdered(bookings)) {
         for (let i = 0; i < bookings.length - 1; i++) {
            if (
               calculateLaterDate(
                  bookings[i].checkIn,
                  bookings[i + 1].checkIn
               ) === bookings[i].checkIn
            ) {
               const mayor = bookings[i];
               bookings[i] = bookings[i + 1];
               bookings[i + 1] = mayor;
            }
         }
      }
   }

   return bookings;
};
