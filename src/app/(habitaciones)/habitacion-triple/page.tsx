import RoomDetails from "@/components/RoomDetails";

export default function HabitacionEstandar() {
   return (
      <main>
         <RoomDetails
            name="Habitación Triple"
            subtitle="Ideal para Familias o Grupos de Viaje"
            descriptionTitle="Espacio y Comodidad para Tu Grupo o Familia en Jauja"
            descriptionContent={
               <p className="mt-8 leading-7 md:leading-8">
                  En Hospedaje El Rinconcito, te presentamos nuestra Habitación
                  Triple, diseñada para ofrecer espacio y comodidad a grupos de
                  amigos o familias que deseen compartir momentos especiales en
                  Jauja. Esta habitación es la elección perfecta para aquellos
                  que buscan un alojamiento espacioso y acogedor. Desde el
                  momento en que ingreses, te sentirás como en casa en este
                  amplio espacio. La Habitación Triple cuenta con tres cómodas
                  camas y una decoración encantadora que crea un ambiente
                  acogedor. Aquí encontrarás todo lo que necesitas para una
                  estancia agradable en Jauja. La habitación está equipada con
                  todas las comodidades modernas, incluyendo un baño privado y
                  comodidades para tu comodidad. Es un lugar donde puedes
                  relajarte, compartir historias del día y planear nuevas
                  aventuras en Jauja. Además, nuestra ubicación estratégica en
                  el corazón de Jauja te brinda acceso inmediato a las
                  atracciones más emocionantes de la ciudad. Después de un día
                  de exploración, regresa a tu habitación y disfruta de un
                  ambiente relajante y acogedor. Si viajas con amigos o familia
                  y buscas una habitación espaciosa y cómoda en Jauja, nuestra
                  Habitación Triple de 120 soles es la elección perfecta.
                  Experimenta la comodidad y el espacio para compartir momentos
                  inolvidables en esta encantadora ciudad andina.
               </p>
            }
            price={110}
            characteristics={[
               "Camas de 2 plazas",
               "5 adultos y 1 niño",
               "Habitación interior",
            ]}
            amenities={["Televisor 51'", "Wi-Fi", "Agua Caliente"]}
            services={["Cochera (Gratis)", "Servicio de Tours"]}
            urlImages={["/fotos__hospedaje/404.jpg"]}
            // recommendedRooms={[
            //    {
            //       href: "/habitacion-doble",
            //       src: "/fotos__hospedaje/304-2.jpg",
            //       name: `Habitación Doble`,
            //       description: "Ideal para familias o grupos de viaje",
            //       price: 90,
            //    },
            //    {
            //       href: "/habitacion-elegante-matrimonial",
            //       src: "/fotos__hospedaje/301-1.jpg",
            //       name: "Habitación Elegante Matrimonial",
            //       description: "Ideal para parejas",
            //       price: 80,
            //    },
            //    {
            //       href: "/habitacion-matrimonial-clasica",
            //       src: "/fotos__hospedaje/401.jpg",
            //       name: "Habitación Clásica Matrimonial",
            //       description: "Ideal para parejas",
            //       price: 70,
            //    },
            // ]}
            backgroundImage="bg-[url('/fotos__hospedaje/404.jpg')]"
         />
      </main>
   );
}
