import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { Booking } from "@/app/panel-administracion/reservas/page";
import { sortBookings } from "@/utils/bookingFunctions";

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
