import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const calculateMonth = (month: number) => {
   switch (month) {
      case 1:
         return "Enero";
         break;
      case 2:
         return "Febrero";
         break;
      case 3:
         return "Marzo";
         break;
      case 4:
         return "Abril";
         break;
      case 5:
         return "Mayo";
         break;
      case 6:
         return "Junio";
         break;
      case 7:
         return "Julio";
         break;
      case 8:
         return "Agosto";
         break;
      case 9:
         return "Septiembre";
         break;
      case 10:
         return "Octubre";
         break;
      case 11:
         return "Noviembre";
         break;
      case 12:
         return "Diciembre";
         break;
   }
};

export const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true,
   auth: {
      user: "hospedajerinconcito861@gmail.com",
      pass: "lqpp vncg kkgq attg",
   },
});

export async function POST(req: NextRequest) {
   const {
      checkIn,
      checkOut,
      email,
      name,
      lastName,
      phone,
      country,
      garage,
      tours,
      roomNumber,
      roomName,
   } = await req.json();

   const emailHospedaje = await transporter.sendMail({
      from: `Hospedaje "El Rinconcito" <hospedajerinconcito861@gmail.com>`,
      to: "jhonadelbuenovillarroel@gmail.com, hospedajerinconcito861@gmail.com",
      subject: "Reservación hecha",
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
            <div style="max-width: 700px; margin: 20px auto; background-color: #202020; border-radius: 12px; padding-top: 32px; padding-bottom: 40px; padding-right: 24px; padding-left: 24px">


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">Check-In </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">

                        ${checkIn.slice(8, 10)} de ${calculateMonth(
         parseInt(checkIn.slice(5, 7))
      )} de ${checkIn.slice(0, 4)}, 12:00 pm

                     </p>
                  </div>
               </div>


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">Check-Out </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">
                        
                        ${checkOut.slice(8, 10)} de ${calculateMonth(
         parseInt(checkOut.slice(5, 7))
      )} de ${checkOut.slice(0, 4)}, 11:00 am

         
                     </p>
                  </div>
               </div>


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">Habitación </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">
                        
                        ${roomName}
         
                     </p>
                  </div>
               </div>


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">N° </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">
                        
                        ${roomNumber}
         
                     </p>
                  </div>
               </div>


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">Correo Electrónico </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">
                        
                        ${email}
         
                     </p>
                  </div>
               </div>


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">Teléfono/Celular </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">
                        
                        ${phone}
         
                     </p>
                  </div>
               </div>


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">País </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px;font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">
                        
                        ${country}
         
                     </p>
                  </div>
               </div>


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">Cochera </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">
                        
                        ${garage ? "Si" : "No"}
         
                     </p>
                  </div>
               </div>


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">Tour </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">
                        
                        ${tours ? "Si" : "No"}
         
                     </p>
                  </div>
               </div>


            </div>
         </body>
      </html>

      `,
   });

   const emailCliente = await transporter.sendMail({
      from: `Hospedaje "El Rinconcito" <hospedajerinconcito861@gmail.com>`,
      to: email,
      subject: "Tu reserva se completó con éxito",
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
            <h1>Aquí están los detalles de tu reserva</h1>

            <div style="max-width: 700px; margin: 20px auto; background-color: #202020; border-radius: 12px; padding-top: 32px; padding-bottom: 40px; padding-right: 24px; padding-left: 24px">


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">Check-In </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">

                        ${checkIn.slice(8, 10)} de ${calculateMonth(
         parseInt(checkIn.slice(5, 7))
      )} de ${checkIn.slice(0, 4)}, 12:00 pm

                     </p>
                  </div>
               </div>


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">Check-Out </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">
                        
                        ${checkOut.slice(8, 10)} de ${calculateMonth(
         parseInt(checkOut.slice(5, 7))
      )} de ${checkOut.slice(0, 4)}, 11:00 am

         
                     </p>
                  </div>
               </div>


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">Habitación </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">
                        
                        ${roomName}
         
                     </p>
                  </div>
               </div>


               <div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-weight: bold; background-color: #CB993F; color: white; border-radius: 8px; font-size: 18px; text-align: center;">N° </p>
                  </div>
                  <div style="display: inline-block; width: 49%">
                     <p style="padding: 8px 16px; font-size: 18px; color: white; display: flex; align-items: center; justify-content: center;">
                        
                        ${roomNumber}
         
                     </p>
                  </div>
               </div>


            </div>

            <div style="margin-top: 40px;">
               
               <p style="color: black; font-weight: bold; font-size: 24px;">Si tienes alguna duda, te puedes comunicar a los números:</p>
               
               <p style="color: black; font-weight: bold; margin-top: 16px; font-size: 16px;">Whatsapp:</p>
               <p style="margin-top: 8px; font-size: 16px;">+51 997706692</p>

               <p style="color: black; font-weight: bold; margin-top: 16px; font-size: 16px;">Teléfono fijo:</p>
               <p style="margin-top: 8px; font-size: 16px;">(064) 362866</p>

            </div>
         </body>
      </html>

      `,
   });

   return NextResponse.json({});
}
