export const deleteFile = async (imageName: any, cloudinary: any) => {
   await cloudinary.uploader.destroy(imageName);
};

export const deleteMultipleFiles = async (imageNames: any, cloudinary: any) => {
   for (let i = 0; i < imageNames.length; i++) {
      await cloudinary.uploader.destroy(imageNames[i]);
   }
};

export const processImage = async (
   image: any,
   cloudinary: any,
   streamifier: any
) => {
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
         { resource_type: "image" },
         function (error: any, result: any) {
            console.log(error, result);
            if (error) {
               reject(error);
            }

            resolve(result);
         }
      );

      streamifier.createReadStream(buffer).pipe(cld_upload_stream);
   });
   return res;
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
