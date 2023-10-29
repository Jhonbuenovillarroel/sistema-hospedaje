"use client";

import AvailableRoom from "@/components/AvailableRoom";
import BookForm from "@/components/BookForm";
import { useGlobalContext } from "@/components/Providers";
import { db } from "@/utils/indexeddb-database";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { calculateMonth } from "@/utils/functions";

export default function ResultadosDeBusqueda() {
   const { availableRooms } = useGlobalContext();

   const dates = useLiveQuery(() => db.dates.toArray());

   return (
      <main className="bg-zinc-950 text-white">
         <section className="">
            <div className="grid grid-cols-1 lg:grid-cols-3 pt-32 pb-20">
               <div className="col-span-2 order-2 mt-20 lg:mt-0 lg:order-1 w-full px-8 flex flex-col gap-20 items-start">
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
                     <div className="w-full">
                        <p className="text-center">
                           Todas las habitaciones están reservadas para esta
                           fecha... Por Favor realiza otra búsqueda
                        </p>
                     </div>
                  )}
               </div>
               <div className="flex order-1 lg:order-2 px-8 items-start justify-center">
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
