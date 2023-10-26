import Room from "@/components/Room";

export default function NuestrasHabitaciones() {
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
            <Room
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
            />
            <Room
               images={["/fotos__hospedaje/401.jpg"]}
               name="Habitacion Clásica Matrimonial"
               price={80}
               characteristics={[
                  "Cama 2 plazas",
                  "2 adultos y 1 niño",
                  "Vista a la calle",
                  "Parejas",
               ]}
               href="/habitacion-clasica-matrimonial"
            />
            <Room
               images={[
                  "/fotos__hospedaje/301-1.jpg",
                  "/fotos__hospedaje/301-2.jpg",
               ]}
               name="Habitacion Elegante Matrimonial"
               price={90}
               characteristics={[
                  "Cama 2 plazas",
                  "2 adultos y 1 niño",
                  "Vista a la calle",
                  "Parejas",
               ]}
               href="/habitacion-elegante-matrimonial"
            />
            <Room
               images={[
                  "/fotos__hospedaje/201-1.jpg",
                  "/fotos__hospedaje/201-2.jpg",
               ]}
               name="Habitacion Matrimonial Superior"
               price={110}
               characteristics={[
                  "Cama Queen",
                  "2 adultos y 1 niño",
                  "Vista a la calle",
                  "Parejas",
               ]}
               href="/habitacion-matrimonial-superior"
            />
            <Room
               images={[
                  "/fotos__hospedaje/304-1.jpg",
                  "/fotos__hospedaje/304-2.jpg",
               ]}
               name="Habitacion Doble"
               price={110}
               characteristics={[
                  "Cama 2 plazas",
                  "4 adultos y 1 niño",
                  "Habitación interior",
                  "Familias o grupos de viaje",
               ]}
               href="/habitacion-doble"
            />
            <Room
               images={["/fotos__hospedaje/404.jpg"]}
               name="Habitacion Triple"
               price={120}
               characteristics={[
                  "Cama 2 plazas y una de 1/2",
                  "5 adultos y 1 niño",
                  "Habitación interior",
                  "Familias o grupos de viaje",
               ]}
               href="/habitacion-triple"
            />
         </section>
      </main>
   );
}
