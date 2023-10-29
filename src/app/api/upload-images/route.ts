import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/cloudinary";
import streamifier from "streamifier";

const processImage = async (image: any, folderPath: any) => {
   const bytes = await image.arrayBuffer();
   const buffer = Buffer.from(bytes);

   // const res = await new Promise((resolve, reject) => {
   //    cloudinary.uploader
   //       .upload_stream({}, (err, res) => {
   //          if (err) {
   //             reject(err);
   //          } else {
   //             resolve(res);
   //          }
   //       })
   //       .end(buffer);
   // });

   const res = await new Promise((resolve, reject) => {
      let cld_upload_stream = cloudinary.uploader.upload_stream(
         {},
         function (error, result) {
            console.log(error, result);
            if (error) {
               reject(error);
            }

            resolve(result);
         }
      );
      streamifier.createReadStream(buffer).pipe(cld_upload_stream);
   });
   console.log(res);
   return res;
};

// const uploadImage = async (folderPath: any) => {
//    const filePath = path.join(process.cwd(), `public${folderPath}`);
//    const res = await cloudinary.uploader.upload(filePath);

//    return res;
// };

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
