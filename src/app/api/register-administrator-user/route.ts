import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { username, email, password, imagesData, userId } = body;

   console.log(imagesData);

   const users = await prisma.user.findMany();

   for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
         return NextResponse.json(
            {
               error: `Ya existe un usuario con este nombre`,
            },
            { status: 500 }
         );
      }

      if (users[i].email === email) {
         return NextResponse.json(
            {
               error: `Ya existe un usuario con este correo electrónico`,
            },
            { status: 500 }
         );
      }
   }

   const passwordHashed = await bcrypt.hash(password, 12);

   const newUser = await prisma.user.create({
      data: {
         username: username,
         email: email,
         password: passwordHashed,
         imageUrl: imagesData.length === 0 ? "" : imagesData[0].imageUrl,
         imageName: imagesData.length === 0 ? "" : imagesData[0].imageName,
      },
   });

   return NextResponse.json({
      user: newUser,
   });
}
