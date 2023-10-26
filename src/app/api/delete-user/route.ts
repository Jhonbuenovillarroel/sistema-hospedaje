import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "@/utils/functions";

export async function POST(req: NextRequest) {
   const body = await req.json();

   try {
      const users = await prisma.user.findMany();

      for (let i = 0; i < users.length; i++) {
         if (users[i].id === body.id) {
            deleteFile(body.urlImage);
         }
      }

      const userDeleted = await prisma.user.delete({
         where: {
            id: body.id,
         },
      });

      return NextResponse.json({ username: userDeleted.username });
   } catch (error) {
      return NextResponse.json(
         { error: "Ups! Algo salió mal, por favor vuelve a intentarlo" },
         { status: 500 }
      );
   }
}
