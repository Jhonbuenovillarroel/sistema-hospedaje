import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse, userAgent } from "next/server";
import jwt from "jsonwebtoken";
import { transporter } from "../send-booking-email/route";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { email } = body;

   const cookieStore = cookies();

   // console.log(process.env.NODE_ENV)

   try {
      const user = await prisma.user.findUnique({
         where: {
            email,
         },
      });

      if (user) {
         const token = jwt.sign(
            { data: { email: user?.email, id: user?.id } },
            "secretKey",
            {
               expiresIn: 3600,
            }
         );

         cookieStore.set("changePasswordToken", token);

         const emailHospedaje = await transporter.sendMail({
            from: `Hospedaje "El Rinconcito" <hospedajerinconcito861@gmail.com>`,
            to: email,
            subject: "Reestablece tu contraseña",
            html: `
            <!DOCTYPE html>
            <html lang="en">
               <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <link rel="preconnect" href="https://fonts.googleapis.com">
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet">
               </head>
               <body style="font-family: 'Raleway', sans-serif;">
                  <a href=${`http://localhost:3000/cambiar-contrasena?token=${token}`}>Cambiar Contraseña</a>
               </body>
            </html>

            `,
         });

         return NextResponse.json({ user });
      } else {
         return NextResponse.json(
            { error: "El email no existe, por favor registrate" },
            {
               status: 400,
            }
         );
      }
   } catch (error) {
      return NextResponse.json(
         { error },
         {
            status: 400,
         }
      );
   }
}
