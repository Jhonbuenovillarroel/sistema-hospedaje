import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { calculateLaterDate } from "../get-available-rooms/route";
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

export async function GET(req: NextRequest) {
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

   return NextResponse.json(orderedBookings);
}
