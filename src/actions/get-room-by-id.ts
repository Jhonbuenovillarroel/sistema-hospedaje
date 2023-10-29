import prisma from "@/lib/prisma/prisma";

export const getRoomById = async (id: any) => {
   try {
      const databaseRoom = await prisma.room.findUnique({
         where: {
            id,
         },
      });

      const databaseImages = await prisma.image.findMany({
         where: {
            roomId: id,
         },
      });
      const databaseAmenities = await prisma.amenitie.findMany({
         where: {
            roomId: id,
         },
      });

      let room: any = databaseRoom;
      room.imageUrls = [];
      room.imageNames = [];
      room.amenities = [];

      for (let i = 0; i < databaseImages.length; i++) {
         room.imageUrls.push(databaseImages[i].url);
         room.imageNames.push(databaseImages[i].name);
      }
      for (let i = 0; i < databaseAmenities.length; i++) {
         room.amenities.push(databaseAmenities[i].name);
      }

      return room;
   } catch (error) {
      return error;
   }
};
