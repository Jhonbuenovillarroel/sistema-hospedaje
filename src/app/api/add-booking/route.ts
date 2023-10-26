import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function POST(req: NextRequest) {
   const body = await req.json();

   try {
      const room = await prisma.room.update({
         where: {
            roomNumber: body.roomNumber,
         },
         data: {
            bookings: {
               create: [
                  {
                     checkIn: body.checkIn,
                     checkOut: body.checkOut,
                     name: body.name,
                     lastname: body.lastname,
                     email: body.email,
                     phone: body.phone,
                     country: body.country,
                     garage: body.garage,
                     tours: body.tours,
                  },
               ],
            },
         },
      });

      return NextResponse.json(room);
   } catch (error) {
      NextResponse.json(error, { status: 500 });
   }
}
