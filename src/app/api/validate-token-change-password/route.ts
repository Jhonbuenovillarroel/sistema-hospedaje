import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
   const cookieStore = cookies();

   const password = await bcrypt.hash("jhonbueno", 12);

   console.log(password);

   const token = cookieStore.get("changePasswordToken")?.value;

   try {
      const exists = jwt.verify(token, "secretKey");

      if (exists) {
         return NextResponse.json({ token: exists });
      } else {
         return NextResponse.json(
            { error: "No autorizado" },
            {
               status: 400,
            }
         );
      }
   } catch (error) {
      return NextResponse.json(
         {
            error,
         },
         {
            status: 400,
         }
      );
   }
}
