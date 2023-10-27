import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   const usersDatabase = await prisma.user.findMany();

   let users = [];

   for (let i = 0; i < usersDatabase.length; i++) {
      users.push({
         username: usersDatabase[i].username,
         email: usersDatabase[i].email,
         image: usersDatabase[i].imageName,
         id: usersDatabase[i].id,
      });
   }

   return NextResponse.json(users);
}
