import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { deleteMultipleFiles } from "@/utils/functions";
import fs from "fs";
import path from "path";
import cloudinary from "@/lib/cloudinary/cloudinary";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const rooms = await prisma.room.findMany();

   try {
      for (let i = 0; i < rooms.length; i++) {
         if (rooms[i].id === body.id) {
            deleteMultipleFiles(body.imageUrls, cloudinary);
         }
      }
      const deletedImages = await prisma.image.deleteMany({
         where: {
            roomId: body.id,
         },
      });
      const deletedAmenities = await prisma.amenitie.deleteMany({
         where: {
            roomId: body.id,
         },
      });
      const deletedBookings = await prisma.booking.deleteMany({
         where: {
            roomId: body.id,
         },
      });
      const deletedRoom = await prisma.room.delete({
         where: {
            id: body.id,
         },
      });
      return NextResponse.json({ room: deletedRoom });
   } catch (error) {
      return NextResponse.json(
         {
            error: "Algo salió mal, por favor intentalo nuevamente más tarde",
         },
         { status: 500 }
      );
   }
}
