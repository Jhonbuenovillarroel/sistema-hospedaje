import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
import { deleteFile } from "@/utils/functions";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { username, email, password, imageUrls, userId } = body;

   console.log(password);

   const users = await prisma.user.findMany();

   if (imageUrls.length === 0) {
      for (let i = 0; i < users.length; i++) {
         if (users[i].id === userId) {
            if (users[i].image) {
               imageUrls.push(users[i].image);
            }
         }
      }
   } else {
      for (let i = 0; i < users.length; i++) {
         if (users[i].id === userId) {
            if (users[i].image) {
               deleteFile(users[i].image);
            }
         }
      }
   }

   if (password) {
      const passwordHashed = await bcrypt.hash(password, 12);

      const editedUser = await prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            username: username,
            email: email,
            password: passwordHashed,
            image: imageUrls[0],
         },
      });
      return NextResponse.json({ user: editedUser });
   } else {
      const editedUser = await prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            username,
            email,
            image: imageUrls[0],
         },
      });
      return NextResponse.json({ user: editedUser });
   }
}
