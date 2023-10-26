export const deleteFile = (filePath: any, fs: any, path: any) => {
   fs.unlink(path.join(process.cwd() + "/public" + filePath), (error: any) => {
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

export const deleteMultipleFiles = (imageUrls: any, fs: any, path: any) => {
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
};

export const calculateMonth = (month: number) => {
   switch (month) {
      case 1:
         return "Enero";
         break;
      case 2:
         return "Febrero";
         break;
      case 3:
         return "Marzo";
         break;
      case 4:
         return "Abril";
         break;
      case 5:
         return "Mayo";
         break;
      case 6:
         return "Junio";
         break;
      case 7:
         return "Julio";
         break;
      case 8:
         return "Agosto";
         break;
      case 9:
         return "Septiembre";
         break;
      case 10:
         return "Octubre";
         break;
      case 11:
         return "Noviembre";
         break;
      case 12:
         return "Diciembre";
         break;
   }
};

export const deleteBooking = async (id: string) => {
   const response = await fetch("/api/delete-booking", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         id,
      }),
   });

   const result = await response.json();

   return result;

   // if (result.error) {
   //    Swal.fire({
   //       title: result.error,
   //       icon: "error",
   //       color: "#fff",
   //       background: "#101010",
   //       confirmButtonColor: "#CB993F",
   //    });
   // } else if (result.booking) {
   //    Swal.fire({
   //       title: "Reserva eliminada correctamente",
   //       color: "#fff",
   //       background: "#101010",
   //       confirmButtonColor: "#CB993F",
   //       icon: "success",
   //    });
   // }
};
