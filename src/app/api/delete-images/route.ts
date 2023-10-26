import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const { imageUrls } = body;

   for (let i = 0; i < imageUrls.length; i++) {
      fs.unlink(
         path.join(process.cwd() + "/public" + imageUrls[i]),
         (error: any) => {
            if (error) {
               console.log(`Error al eliminar el archivo: ${error}`);
            } else {
               console.log(
                  `El archivo ${path.join(
                     process.cwd() + "/public" + imageUrls[i]
                  )} ha sido eliminado con éxito`
               );
            }
         }
      );
   }

   return NextResponse.json({});
}
