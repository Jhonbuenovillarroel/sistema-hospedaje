import { getRoomById } from "@/actions/get-room-by-id";
import { getRooms } from "@/actions/get-rooms";
import RecommendedRoom from "@/components/RecommendedRoom";
import RoomDetails from "@/components/RoomDetails";
import React from "react";
type RecommendedRoom = {
   href: string;
   src: string;
   name: string;
   description: string;
   price: number;
};

const DetallesHabitacion = async ({
   params,
   searchParams,
}: {
   params: { slug: string };
   searchParams: { [key: string]: string | string[] | undefined };
}) => {
   const rooms: any = await getRooms();

   return (
      <main>
         {rooms &&
            rooms.map(
               (room: any, i: number) =>
                  room.id === searchParams.roomId && (
                     <RoomDetails
                        key={i}
                        name={room.name}
                        subtitle={room.target}
                        descriptionTitle="Comodidad y Espacio para Compartir en Jauja"
                        descriptionContent={
                           <p className="mt-8 leading-7 md:leading-8">
                              En Hospedaje &quot;El Rinconcito&quot;, te
                              presentamos nuestra Habitación Doble, un espacio
                              diseñado para brindar comodidad y amplitud a
                              aquellos que viajan en pareja o con amigos. Esta
                              habitación es perfecta para quienes buscan
                              compartir momentos especiales en Jauja sin
                              renunciar a la comodidad. Desde el momento en que
                              ingreses, te sorprenderá la generosidad de este
                              espacio. <br /> <br /> Con dos camas cómodas y una
                              decoración acogedora, la Habitación Doble es un
                              refugio perfecto para relajarse después de un día
                              de exploración en Jauja. La Habitación Doble está
                              equipada con todas las comodidades que necesitas
                              para una estancia confortable, incluyendo un baño
                              privado y comodidades modernas. Es un lugar donde
                              puedes descansar, compartir historias del día y
                              planear nuevas aventuras en Jauja. <br /> <br />{" "}
                              Además, nuestra ubicación céntrica te permitirá
                              acceder fácilmente a las atracciones más
                              emocionantes de la ciudad. Después de un día de
                              exploración, regresa a tu habitación y disfruta
                              del ambiente relajante que ofrece. Si viajas en
                              pareja o con amigos y buscas una habitación cómoda
                              y espaciosa en Jauja, nuestra Habitación Doble de
                              110 soles es la elección perfecta. Experimenta la
                              comodidad y el espacio para compartir momentos
                              inolvidables en el corazón de Jauja.
                           </p>
                        }
                        price={room.price}
                        characteristics={[
                           room.bed,
                           `${room.adults} adultos y ${room.children} niños`,
                           room.view,
                        ]}
                        amenities={room.amenities}
                        services={["Cochera (Gratis)", "Servicio de Tours"]}
                        urlImages={room.imageUrls}
                        backgroundImage={room.imageUrls[0]}
                     />
                  )
            )}
         <section className="my-20">
            <div>
               <div className="flex flex-col items-center justify-center">
                  <h3 className="text-4xl text-center font-bold">
                     Otras Habitaciones
                  </h3>
                  <p className="text-center max-w-[240px] mt-3">
                     También podrían ser de tu interés
                  </p>
               </div>
               <div className="mt-16 mb-24 h-full px-8 flex flex-col items-center justify-center md:flex-row md:items-start gap-16 md:gap-8">
                  {rooms &&
                     rooms
                        .map(
                           (room: any, i: number) =>
                              room.id !== searchParams.roomId && (
                                 <RecommendedRoom
                                    key={i}
                                    href={`/detalles-habitacion?roomId=${room.id}`}
                                    src={room.imageUrls[0]}
                                    name={room.name}
                                    description={room.description}
                                    price={room.price}
                                 />
                              )
                        )
                        .map((room: any, i: any) => i < 4 && room)}
               </div>
            </div>
         </section>
      </main>
   );
};

export default DetallesHabitacion;
