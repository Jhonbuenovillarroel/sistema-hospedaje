import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

interface Room {
   id: string;
   name: string;
   roomNumber: number;
   description: string;
   adults: number;
   children: number;
   view: string;
   bed: string;
   category: string;
   price: number;
   amenities?: string[];
   images?: string[];
}

export async function GET(req: NextRequest) {
   const rooms: Room[] = await prisma.room.findMany();

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

   return NextResponse.json(rooms);
}
