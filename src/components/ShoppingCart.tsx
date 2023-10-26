"use client";

import { Rooms, db } from "@/utils/indexeddb-database";
import { useLiveQuery } from "dexie-react-hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function ShoppingCart() {
   const router = useRouter();
   const rooms = useLiveQuery(() => db.rooms.toArray());
   const [showCart, setShowCart] = useState<boolean>(false);
   const [cartStyles, setCartStyles] = useState<string>("");

   useEffect(() => {
      if (rooms && rooms?.length > 0 && rooms.length < 2) {
         setShowCart(true);
      }
   }, [rooms]);

   return (
      <>
         <div
            onClick={() => {
               if (rooms?.length !== 0) {
                  setShowCart(true);
               }
            }}
            className="relative cursor-pointer"
         >
            <AiOutlineShoppingCart className="w-7 h-7 cursor-pointer" />
            <div className="absolute flex items-center justify-center text-[12px] w-5 h-5 bg-red-400 rounded-full top-[-8px] right-[-9px]">
               {rooms?.length}
            </div>
         </div>

         {rooms?.length === 0 ? (
            <div></div>
         ) : showCart ? (
            <div
               className={`fixed ${cartStyles} transition-all duration-500 custom-scroll-bar  overflow-y-scroll top-0 right-0 bottom-0 bg-zinc-900 flex flex-col gap-8 px-12 py-16`}
            >
               <AiOutlineClose
                  onClick={() => {
                     setShowCart(false);
                  }}
                  className="w-7 h-7 absolute top-3 right-3 cursor-pointer"
               />
               {rooms &&
                  rooms.map((element: any, i) => (
                     <div key={i}>
                        <div className="grid grid-cols-3 gap-8 justify-items-center max-w-[400px]">
                           <Image
                              className="w-36 h-18 object-cover"
                              width={400}
                              height={400}
                              src={element.urlImages[0]}
                              alt={element.name}
                           />
                           <div className="">
                              <p className="text-base texto-limitado font-medium text-zinc-100">
                                 {element.name}
                              </p>
                              <p className="text-md mt-3 font-bold">
                                 S/ {element.price}
                              </p>
                           </div>
                           <button
                              onClick={async () => {
                                 await db.rooms.update(element.id, {
                                    reserved: false,
                                 });
                                 await db.rooms.delete(element.id);
                                 if (rooms.length === 0) {
                                    setShowCart(false);
                                 }
                              }}
                              className="w-20 self-center bg-zinc-700 rounded-md flex items-center justify-center h-8"
                           >
                              Quitar
                           </button>
                        </div>
                     </div>
                  ))}

               <button
                  onClick={() => {
                     setShowCart(false);
                     router.push("/pago");
                  }}
                  className="w-full bg-[#CB993F] py-4 mt-8 rounded-full uppercase tracking-widest text-xs font-semibold"
               >
                  Realizar Pago
               </button>
            </div>
         ) : (
            <></>
         )}
      </>
   );
}
