import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function POST(req: NextRequest) {
   const body = await req.json();

   try {
      const user = await prisma.user.findUnique({
         where: {
            username: body.username,
         },
      });
      if (user) {
         return NextResponse.json(user);
      } else {
         return NextResponse.json(
            { error: "El usuario no existe" },
            { status: 400 }
         );
      }
   } catch (error) {
      return NextResponse.json(
         {
            error,
         },
         {
            status: 500,
         }
      );
   }
}
