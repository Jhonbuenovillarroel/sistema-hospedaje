import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

const uploadImage = async (image: any, folderPath: any) => {
   const bytes = await image.arrayBuffer();
   const buffer = Buffer.from(bytes);
   const filePath = path.join(process.cwd(), `public${folderPath}`, image.name);

   writeFile(filePath, buffer);

   return `${folderPath}/${image.name}`;
};

const imagesExist = (form: any) => {
   let images: any = [];

   const publicFolder = path.join(process.cwd(), "public");
   const photosHospedajeFolder = path.join(
      process.cwd(),
      "public/fotos__hospedaje"
   );
   const profilePicturesFolder = path.join(
      process.cwd(),
      "public/profile-pictures"
   );

   const filesPublicFolder = fs.readdirSync(publicFolder);
   const filesPhotosHospedajeFolder = fs.readdirSync(photosHospedajeFolder);
   const filesProfilePicturesFolder = fs.readdirSync(profilePicturesFolder);

   const allImages = [
      ...filesPublicFolder,
      ...filesPhotosHospedajeFolder,
      ...filesProfilePicturesFolder,
   ];

   for (let i = 0; i < Array.from(form.entries()).length - 1; i++) {
      images.push(form.get(`image${i + 1}`));
   }

   for (let i = 0; i < images.length; i++) {
      for (let j = 0; j < allImages.length; j++) {
         if (images[i].name === allImages[j]) {
            return images[i].name;
         }
      }
   }
   return images;
};

export async function POST(req: NextRequest) {
   const form = await req.formData();

   if (Array.from(form.entries()).length > 1) {
      if (typeof imagesExist(form) === "string") {
         const image = imagesExist(form);
         return NextResponse.json(
            {
               error: `Ya existe una imagen con el nombre de ${image}`,
            },
            { status: 500 }
         );
      } else {
         const images = imagesExist(form);
         let urls = [];
         for (let i = 0; i < images.length; i++) {
            const filePath = await uploadImage(
               images[i],
               form.get("folderPath")
            );
            urls.push(filePath);
         }

         return NextResponse.json(urls);
      }
   }

   return NextResponse.json([]);
}
