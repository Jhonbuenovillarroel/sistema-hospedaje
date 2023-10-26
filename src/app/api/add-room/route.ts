import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const {
      name,
      description,
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
      images.push({ url: body.images[i] });
   }

   try {
      const newRoom = await prisma.room.create({
         data: {
            name,
            description,
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
