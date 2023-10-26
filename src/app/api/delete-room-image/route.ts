import prisma from "@/lib/prisma/prisma";
import { deleteFile } from "@/utils/functions";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { urlImage } = body;

   try {
      deleteFile(urlImage, fs, path);

      const deletedImage = await prisma.image.deleteMany({
         where: {
            url: urlImage,
         },
      });
      return NextResponse.json({ image: deletedImage });
   } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
   }
}
