import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { email, newPassword } = body;

   try {
      const passwordHashed = await bcrypt.hash(newPassword, 12);

      const user = await prisma.user.update({
         where: {
            email,
         },
         data: {
            password: passwordHashed,
         },
      });

      return NextResponse.json({ ok: true });
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
   }

   return NextResponse.json({});
}
