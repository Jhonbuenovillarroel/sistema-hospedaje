import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import cloudinary from "@/lib/cloudinary/cloudinary";

const processImage = async (image: any, folderPath: any) => {
   const bytes = await image.arrayBuffer();
   const buffer = Buffer.from(bytes);
   const filePath = path.join(process.cwd(), `public${folderPath}`, image.name);

   writeFile(filePath, buffer);

   return `${folderPath}/${image.name}`;
};

const uploadImage = async (folderPath: any) => {
   const filePath = path.join(process.cwd(), `public${folderPath}`);
   const res = await cloudinary.uploader.upload(filePath);

   console.log(res);

   return res;
};

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
            const filePath = await processImage(
               images[i],
               form.get("folderPath")
            );
            const res = await uploadImage(filePath);

            // Eliminar la imagen
            fs.unlink(
               path.join(process.cwd() + "/public" + filePath),
               (error: any) => {
                  if (error) {
                     console.log(`Error al eliminar el archivo: ${error}`);
                  } else {
                     console.log(
                        `El archivo ${path.join(
                           process.cwd() + "/public" + filePath
                        )} ha sido eliminado con éxito`
                     );
                  }
               }
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
