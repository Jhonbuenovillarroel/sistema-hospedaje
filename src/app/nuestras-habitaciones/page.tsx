import Room from "@/components/Room";
import { getRooms } from "@/actions/get-rooms";
import { cookies } from "next/headers";

// const getData = async () => {
//    const rooms: any = await getRooms();

//    return rooms;
// };

export default async function NuestrasHabitaciones() {
   const rooms = await getRooms();

   const cookieStore = cookies();

   return (
      <main>
         <section>
            <div className="pt-24 md:pt-32 px-8">
               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  Habitaciones Encantadoras en el Corazón de Jauja
               </h1>
               <p className="mt-4 lg:text-lg">
                  Descubre el encanto y confort de nuestras habitaciones en
                  Jauja.
               </p>
            </div>
         </section>
         <section className="mt-16">
            {rooms &&
               rooms.map((room: any, i: number) => (
                  <Room
                     key={i}
                     images={room.imageUrls}
                     name={room.name}
                     price={room.price}
                     characteristics={[
                        room.bed,
                        `${room.adults} adultos y ${room.children} niños`,
                        room.view,
                        room.description,
                     ]}
                     href={`/detalles-habitacion?roomId=${room.id}`}
                  />
               ))}

            {/* <Room
               images={[
                  "/fotos__hospedaje/303-1.jpg",
                  "/fotos__hospedaje/303-2.jpg",
               ]}
               name="Habitacion Estándar"
               price={70}
               characteristics={[
                  "Cama 2 plazas",
                  "2 adultos y 1 niño",
                  "Habitación interior",
                  "Persona sola o pareja",
               ]}
               href="/habitacion-estandar"
            /> */}
         </section>
      </main>
   );
}
