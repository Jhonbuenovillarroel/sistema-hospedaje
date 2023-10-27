import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import cloudinary from "@/lib/cloudinary/cloudinary";
import { deleteMultipleFiles } from "@/utils/functions";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { imageNames } = body;

   for (let i = 0; i < imageNames.length; i++) {
      await deleteMultipleFiles(imageNames[i], cloudinary);
   }

   return NextResponse.json({});
}
