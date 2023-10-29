import prisma from "@/lib/prisma/prisma";
import { deleteFile } from "@/utils/functions";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import cloudinary from "@/lib/cloudinary/cloudinary";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { url } = body;

   try {
      const image = await prisma.image.findUnique({
         where: {
            url,
         },
      });

      await deleteFile(image?.name, cloudinary);

      const deletedImage = await prisma.image.deleteMany({
         where: {
            url,
         },
      });

      return NextResponse.json({ image: deletedImage });
   } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
   }
}
