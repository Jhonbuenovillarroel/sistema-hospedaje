import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { deleteMultipleFiles } from "@/utils/functions";
import fs from "fs";
import path from "path";

export const deleteRoom = async (id: any, imageUrls: any) => {
   const rooms = await prisma.room.findMany();

   try {
      for (let i = 0; i < rooms.length; i++) {
         if (rooms[i].id === id) {
            deleteMultipleFiles(imageUrls, fs, path);
         }
      }
      const deletedImages = await prisma.image.deleteMany({
         where: {
            roomId: id,
         },
      });
      const deletedAmenities = await prisma.amenitie.deleteMany({
         where: {
            roomId: id,
         },
      });
      const deletedBookings = await prisma.booking.deleteMany({
         where: {
            roomId: id,
         },
      });
      const deletedRoom = await prisma.room.delete({
         where: {
            id: id,
         },
      });
      return { room: deletedRoom };
   } catch (error) {
      return {
         error: "Algo salió mal, por favor intentalo nuevamente más tarde",
      };
   }
};
