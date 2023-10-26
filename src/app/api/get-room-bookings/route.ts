import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const bookings = await prisma.booking.findMany({
      where: {
         roomId: body.id,
      },
   });

   if (bookings.length === 0) {
      return NextResponse.json({ bookings: null });
   } else {
      return NextResponse.json({ bookings });
   }
}
