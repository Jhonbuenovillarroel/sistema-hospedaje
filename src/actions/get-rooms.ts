import prisma from "@/lib/prisma/prisma";
import { Room } from "@/app/panel-administracion/habitaciones/page";

export const getRooms = async () => {
   const rooms: any = await prisma.room.findMany();

   const databaseAmenities = await prisma.amenitie.findMany();
   const databaseImages = await prisma.image.findMany();

   for (let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < databaseAmenities.length; j++) {
         if (rooms[i].id === databaseAmenities[j].roomId) {
            if (!rooms[i].amenities) {
               rooms[i].amenities = [];
            }
            rooms[i].amenities?.push(databaseAmenities[j].name);
         }
      }

      for (let k = 0; k < databaseImages.length; k++) {
         if (rooms[i].id === databaseImages[k].roomId) {
            if (!rooms[i].images) {
               rooms[i].images = [];
            }
            rooms[i].images?.push(databaseImages[k].url);
         }
      }
   }

   return rooms;
};
