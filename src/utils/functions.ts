import fs from "fs";
import path from "path";

export const deleteFile = (filePath: any) => {
   fs.unlink(path.join(process.cwd() + "/public" + filePath), (error) => {
      if (error) {
         console.log(`Error al eliminar el archivo: ${error}`);
      } else {
         console.log(
            `El archivo ${path.join(
               process.cwd() + "/public" + filePath
            )} ha sido eliminado con éxito`
         );
      }
   });
};

export const deleteMultipleFiles = (imageUrls: any) => {
   for (let i = 0; i < imageUrls.length; i++) {
      fs.unlink(
         path.join(process.cwd() + "/public" + imageUrls[i]),
         (error) => {
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
};
