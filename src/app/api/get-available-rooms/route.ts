import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Booking {
   id: string;
   checkIn: string;
   checkOut: string;
   name: string;
   lastname: string;
   email: string;
   phone: string;
   country: string;
   garage: boolean;
   tours: boolean;
}

interface AvailableRoom {
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
   bookings?: Booking[];
}

export const calculateLaterDate = (date1: string, date2: string) => {
   let laterDate = date1;
   if (parseInt(date1.slice(0, 4)) > parseInt(date2.slice(0, 4))) {
      laterDate = date1;
   } else if (parseInt(date1.slice(0, 4)) === parseInt(date2.slice(0, 4))) {
      if (parseInt(date1.slice(5, 7)) > parseInt(date2.slice(5, 7))) {
         laterDate = date1;
      } else if (parseInt(date1.slice(5, 7)) === parseInt(date2.slice(5, 7))) {
         if (parseInt(date1.slice(8, 10)) > parseInt(date2.slice(8, 10))) {
            laterDate = date1;
         } else if (
            parseInt(date1.slice(8, 10)) === parseInt(date2.slice(8, 10))
         ) {
            return "son iguales";
         } else {
            laterDate = date2;
         }
      } else {
         laterDate = date2;
      }
   } else {
      laterDate = date2;
   }

   return laterDate;
};

export async function POST(req: NextRequest) {
   const { checkIn, checkOut } = await req.json();

   const databaseRooms = await prisma.room.findMany();
   const databaseAmenities = await prisma.amenitie.findMany();
   const databaseImages = await prisma.image.findMany();
   const databaseBookings = await prisma.booking.findMany();

   const availableRooms: any = databaseRooms;

   for (let i = 0; i < availableRooms.length; i++) {
      for (let j = 0; j < databaseAmenities.length; j++) {
         if (availableRooms[i].id === databaseAmenities[j].roomId) {
            if (!availableRooms[i].amenities) {
               availableRooms[i].amenities = [];
            }
            availableRooms[i].amenities?.push(databaseAmenities[j].name);
         }
      }

      for (let k = 0; k < databaseImages.length; k++) {
         if (availableRooms[i].id === databaseImages[k].roomId) {
            if (!availableRooms[i].images) {
               availableRooms[i].images = [];
            }
            availableRooms[i].images?.push(databaseImages[k].url);
         }
      }

      availableRooms[i].bookings = [];
      for (let l = 0; l < databaseBookings.length; l++) {
         if (availableRooms[i].id === databaseBookings[l].roomId) {
            availableRooms[i].bookings?.push(databaseBookings[l]);
         }
      }
   }

   let newArray = [];

   for (let i = 0; i < availableRooms.length; i++) {
      if (availableRooms[i].bookings.length === 0) {
         newArray.push(availableRooms[i]);
         continue;
      }
      if (availableRooms[i].bookings.length > 0) {
         //@ts-ignore
         let available = true;

         for (let j = 0; j < availableRooms[i].bookings.length; j++) {
            if (
               calculateLaterDate(
                  checkIn,
                  availableRooms[i].bookings[j].checkIn
               ) === availableRooms[i].bookings[j].checkIn
            ) {
               if (
                  calculateLaterDate(
                     checkOut,
                     availableRooms[i].bookings[j].checkIn
                  ) === availableRooms[i].bookings[j].checkIn ||
                  calculateLaterDate(
                     checkOut,
                     availableRooms[i].bookings[j].checkIn
                  ) === "son iguales"
               ) {
                  // newArray.push(availableRooms[i]);
               } else if (
                  calculateLaterDate(
                     checkOut,
                     availableRooms[i].bookings[j].checkIn
                  ) === checkOut
               ) {
                  available = false;
               }
            } else if (
               calculateLaterDate(
                  checkIn,
                  availableRooms[i].bookings[j].checkIn
               ) === "son iguales"
            ) {
               available = false;
            } else if (
               calculateLaterDate(
                  checkIn,
                  availableRooms[i].bookings[j].checkIn
               ) === checkIn
            ) {
               if (
                  calculateLaterDate(
                     checkIn,
                     availableRooms[i].bookings[j].checkOut
                  ) === checkIn
               ) {
                  // newArray.push(availableRooms[i]);
               } else if (
                  calculateLaterDate(
                     checkIn,
                     availableRooms[i].bookings[j].checkOut
                  ) === availableRooms[i].bookings[j].checkOut
               ) {
                  available = false;
               }
            }
         }

         if (available) {
            newArray.push(availableRooms[i]);
         }
      }
   }

   return NextResponse.json(newArray);
}
