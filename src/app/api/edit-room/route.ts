import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const {
      id,
      name,
      target,
      descriptionTitle,
      descriptionContent,
      roomNumber,
      adults,
      children,
      view,
      bed,
      category,
      price,
   } = body;

   const amenities = [];
   const images = [];

   for (let i = 0; i < body.amenities.length; i++) {
      amenities.push({ name: body.amenities[i] });
   }

   console.log(body.images);
   for (let i = 0; i < body.images.length; i++) {
      images.push({
         url: body.images[i].imageUrl,
         name: body.images[i].imageName,
      });
   }

   try {
      const deletedAmenities = await prisma.amenitie.deleteMany({
         where: {
            roomId: id,
         },
      });

      const updatedRoom = await prisma.room.update({
         where: {
            id: id,
         },
         data: {
            name,
            target,
            descriptionTitle,
            descriptionContent,
            roomNumber: parseInt(roomNumber),
            adults: parseInt(adults),
            children: parseInt(children),
            amenities: {
               create: amenities,
            },
            view,
            bed,
            category,
            price: parseInt(price),
            images: {
               create: images,
            },
         },
      });

      return NextResponse.json({ room: updatedRoom });
   } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
   }
}
