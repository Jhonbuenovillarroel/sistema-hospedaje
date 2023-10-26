"use client";

import AvailableRoom from "@/components/AvailableRoom";
import BookForm from "@/components/BookForm";
import { useGlobalContext } from "@/components/Providers";
import { db } from "@/utils/indexeddb-database";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";

export const calculateMonth = (month: number) => {
   switch (month) {
      case 1:
         return "Enero";
         break;
      case 2:
         return "Febrero";
         break;
      case 3:
         return "Marzo";
         break;
      case 4:
         return "Abril";
         break;
      case 5:
         return "Mayo";
         break;
      case 6:
         return "Junio";
         break;
      case 7:
         return "Julio";
         break;
      case 8:
         return "Agosto";
         break;
      case 9:
         return "Septiembre";
         break;
      case 10:
         return "Octubre";
         break;
      case 11:
         return "Noviembre";
         break;
      case 12:
         return "Diciembre";
         break;
   }
};

export default function ResultadosDeBusqueda() {
   const { availableRooms } = useGlobalContext();

   const dates = useLiveQuery(() => db.dates.toArray());

   return (
      <main>
         <section className="">
            <div className="grid grid-cols-1 lg:grid-cols-3 pt-32 mb-20">
               <div className="col-span-2 w-full px-8 flex flex-col gap-20 items-start">
                  {availableRooms.length !== 0 && dates?.length !== 0 ? (
                     <>
                        <p className="text-xl font-medium">
                           {availableRooms.length} habitaciones encontradas
                           desde el{" "}
                           {dates &&
                              dates[dates.length - 1].checkIn.slice(8, 10)}{" "}
                           de{" "}
                           {dates &&
                              calculateMonth(
                                 parseInt(
                                    dates[dates.length - 1].checkIn.slice(5, 7)
                                 )
                              )}{" "}
                           de{" "}
                           {dates &&
                              dates[dates.length - 1].checkIn.slice(0, 4)}{" "}
                           - hasta el{" "}
                           {dates &&
                              dates[dates.length - 1].checkOut.slice(
                                 8,
                                 10
                              )}{" "}
                           de{" "}
                           {dates &&
                              calculateMonth(
                                 parseInt(
                                    dates[dates.length - 1].checkOut.slice(5, 7)
                                 )
                              )}{" "}
                           de{" "}
                           {dates &&
                              dates[dates.length - 1].checkOut.slice(0, 4)}
                        </p>
                        {availableRooms.map((element, i) => (
                           <AvailableRoom
                              key={i}
                              roomNumber={element.roomNumber}
                              name={element.name}
                              description={element.description}
                              adults={element.adults}
                              childrens={element.children}
                              view={element.view}
                              bed={element.bed}
                              category={element.category}
                              price={element.price}
                              amenities={element.amenities}
                              images={element.images}
                           />
                        ))}
                     </>
                  ) : (
                     <div>
                        <p>
                           Todas las habitaciones están reservadas para esta
                           fecha... Por Favor realiza otra búsqueda
                        </p>
                     </div>
                  )}
               </div>
               <div className="flex mt-20 px-8 items-start justify-center">
                  <BookForm
                     className="w-full flex flex-col gap-4 max-w-[400px] lg:max-w-[300px]"
                     alignButton=""
                  />
               </div>
            </div>
         </section>
      </main>
   );
}
