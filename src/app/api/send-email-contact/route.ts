import { NextRequest, NextResponse } from "next/server";
import { transporter } from "../send-booking-email/route";
import prisma from "@/lib/prisma/prisma";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { name, email, phone, message } = body;

   try {
      const customer = await prisma.customer.findUnique({
         where: {
            email,
         },
      });

      if (!customer) {
         console.log("no existe");
         const createdCustomer = await prisma.customer.create({
            data: {
               email,
               name,
            },
         });
      }

      const emailHospedaje = await transporter.sendMail({
         from: `Hospedaje "El Rinconcito" <hospedajerinconcito861@gmail.com>`,
         to: "hospedajerinconcito861@gmail.com, jhonadelbuenovillarroel@gmail.com",
         subject: `Hospedaje El Rinconcito - Mensaje de ${name}`,
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
   
               
               <div style="margin-top: 40px">
                  <p style="font-weight: bold; margin-top: 20px;">Correo Electrónico:</p>
                  <p>${email}</p>
   
   
                  <p style="font-weight: bold; margin-top: 20px;">Teléfono:</p>
                  <p>${phone ? phone : "No enviado"}</p>
   
   
                  <p style="font-weight: bold; margin-top: 20px;">Mensaje:</p>
                  <p>${message}</p>
               
               </div>
   
   
            </body>
         </html>
   
         `,
      });

      return NextResponse.json({ ok: true });
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
   }
}
