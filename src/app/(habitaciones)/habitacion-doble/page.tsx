import RoomDetails from "@/components/RoomDetails";

export default function HabitacionEstandar() {
   return (
      <main>
         <RoomDetails
            name="Habitación Doble"
            subtitle="Ideal para Familias o Grupos de Viaje"
            descriptionTitle="Comodidad y Espacio para Compartir en Jauja"
            descriptionContent={
               <p className="mt-8 leading-7 md:leading-8">
                  En Hospedaje &quot;El Rinconcito&quot;, te presentamos nuestra
                  Habitación Doble, un espacio diseñado para brindar comodidad y
                  amplitud a aquellos que viajan en pareja o con amigos. Esta
                  habitación es perfecta para quienes buscan compartir momentos
                  especiales en Jauja sin renunciar a la comodidad. Desde el
                  momento en que ingreses, te sorprenderá la generosidad de este
                  espacio. <br /> <br /> Con dos camas cómodas y una decoración
                  acogedora, la Habitación Doble es un refugio perfecto para
                  relajarse después de un día de exploración en Jauja. La
                  Habitación Doble está equipada con todas las comodidades que
                  necesitas para una estancia confortable, incluyendo un baño
                  privado y comodidades modernas. Es un lugar donde puedes
                  descansar, compartir historias del día y planear nuevas
                  aventuras en Jauja. <br /> <br /> Además, nuestra ubicación
                  céntrica te permitirá acceder fácilmente a las atracciones más
                  emocionantes de la ciudad. Después de un día de exploración,
                  regresa a tu habitación y disfruta del ambiente relajante que
                  ofrece. Si viajas en pareja o con amigos y buscas una
                  habitación cómoda y espaciosa en Jauja, nuestra Habitación
                  Doble de 110 soles es la elección perfecta. Experimenta la
                  comodidad y el espacio para compartir momentos inolvidables en
                  el corazón de Jauja.
               </p>
            }
            price={90}
            characteristics={[
               "Camas de 2 plazas",
               "4 adultos y 1 niño",
               "Habitación interior",
            ]}
            amenities={["Televisor 51'", "Wi-Fi", "Agua Caliente"]}
            services={["Cochera (Gratis)", "Servicio de Tours"]}
            urlImages={[
               "/fotos__hospedaje/304-1.jpg",
               "/fotos__hospedaje/304-2.jpg",
            ]}
            // recommendedRooms={[
            //    {
            //       href: "/habitacion-triple",
            //       src: "/fotos__hospedaje/404.jpg",
            //       name: `Habitación Triple`,
            //       description: "Ideal para familias o grupos de viaje",
            //       price: 110,
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
            backgroundImage="bg-[url('/fotos__hospedaje/304-2.jpg')]"
         />
      </main>
   );
}
