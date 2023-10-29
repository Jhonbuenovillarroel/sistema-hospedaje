import prisma from "@/lib/prisma/prisma";
import { sortBookings } from "@/utils/bookingFunctions";
import { Booking } from "@/app/panel-administracion/reservas/page";

export const obtenerReservas = async () => {
   const bookingsDatabase = await prisma.booking.findMany();
   const roomsDatabase = await prisma.room.findMany();

   let bookings: Booking[] = [];

   for (let i = 0; i < roomsDatabase.length; i++) {
      for (let j = 0; j < bookingsDatabase.length; j++) {
         if (roomsDatabase[i].id === bookingsDatabase[j].roomId) {
            bookings.push({
               ...bookingsDatabase[j],
               roomNumber: roomsDatabase[i].roomNumber,
               roomPrice: roomsDatabase[i].price,
               roomName: roomsDatabase[i].name,
            });
         }
      }
   }

   const orderedBookings = sortBookings(bookings);

   return orderedBookings;
};
