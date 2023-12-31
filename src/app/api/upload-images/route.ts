import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/cloudinary";
import streamifier from "streamifier";
import { processImage } from "@/utils/functions";

const returnImages = (form: any) => {
   let images: any = [];

   for (let i = 0; i < Array.from(form.entries()).length - 1; i++) {
      images.push(form.get(`image${i + 1}`));
   }

   return images;
};

export async function POST(req: NextRequest) {
   const form = await req.formData();

   try {
      if (Array.from(form.entries()).length > 1) {
         const images = returnImages(form);

         let urls = [];

         for (let i = 0; i < images.length; i++) {
            const res: any = await processImage(
               images[i],
               cloudinary,
               streamifier,
               form.get("folderPath")
            );

            urls.push({ imageUrl: res.secure_url, imageName: res.public_id });
         }
         return NextResponse.json(urls);
      } else {
         return NextResponse.json([]);
      }
   } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
   }
}
