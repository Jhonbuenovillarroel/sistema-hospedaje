import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const deleteRoom = async (id: any) => {
   const rooms = await prisma.room.findMany();

   try {
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
