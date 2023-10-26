import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const body = await req.json();

   try {
      const updatedBooking = await prisma.booking.update({
         where: {
            id: body.id,
         },
         data: {
            checkIn: body.checkIn,
            checkOut: body.checkOut,
            name: body.name,
            lastname: body.lastName,
            email: body.email,
            phone: body.phone,
            country: body.country,
            garage: body.garage,
            tours: body.tours,
            roomId: body.roomId,
         },
      });

      return NextResponse.json({ booking: updatedBooking });
   } catch (error) {
      return NextResponse.json(
         { error },
         {
            status: 500,
         }
      );
   }
}
