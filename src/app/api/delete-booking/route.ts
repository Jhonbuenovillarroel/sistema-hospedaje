import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { id } = body;

   try {
      const deletedBooking = await prisma.booking.delete({
         where: {
            id,
         },
      });
      return NextResponse.json({ booking: deletedBooking });
   } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
   }
}
