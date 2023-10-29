import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const {
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

   for (let i = 0; i < body.images.length; i++) {
      images.push({
         url: body.images[i].imageUrl,
         name: body.images[i].imageName,
      });
   }

   try {
      const newRoom = await prisma.room.create({
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
      return NextResponse.json({ room: newRoom });
   } catch (error) {
      NextResponse.json({ error }, { status: 500 });
   }
}
