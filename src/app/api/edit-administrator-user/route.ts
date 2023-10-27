import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
import { deleteFile } from "@/utils/functions";
import cloudinary from "@/lib/cloudinary/cloudinary";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { username, email, password, imagesData, userId } = body;

   console.log(password);

   const users = await prisma.user.findMany();

   if (imagesData.length === 0) {
      for (let i = 0; i < users.length; i++) {
         if (users[i].id === userId) {
            if (users[i].imageUrl && users[i].imageName) {
               imagesData.push([users[i].imageUrl, users[i].imageName]);
            }
         }
      }
   } else {
      for (let i = 0; i < users.length; i++) {
         if (users[i].id === userId) {
            if (users[i].imageUrl && users[i].imageName) {
               deleteFile(users[i].imageName, cloudinary);
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
            imageUrl: imagesData[0].imageUrl,
            imageName: imagesData[0].imageName,
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
            imageUrl: imagesData[0].imageUrl,
            imageName: imagesData[0].imageName,
         },
      });
      return NextResponse.json({ user: editedUser });
   }
}
