import RoomDetails from "@/components/RoomDetails";

export default function HabitacionMatrimonialClasica() {
   return (
      <main>
         <RoomDetails
            name="Habitación Matrimonial Clásica"
            subtitle="Ideal para parejas"
            descriptionTitle="Descubre la Comodidad y Elegancia en Nuestra Habitación con Vista a la Calle"
            descriptionContent={
               <p className="mt-8 leading-7 md:leading-8">
                  En Hospedaje "El Rinconcito", te ofrecemos una experiencia de
                  alojamiento excepcional en nuestra Habitación con Vista a la
                  Calle. Con un precio asequible, esta habitación espaciosa es
                  perfecta para aquellos que desean un espacio extra para
                  relajarse y disfrutar de la belleza de Jauja. Desde el momento
                  en que entras, quedarás cautivado por la amplitud y la
                  elegancia de esta habitación. La vista a la calle te permite
                  absorber la esencia de Jauja desde la comodidad de tu
                  alojamiento. <br /> <br /> Despiértate con la luz del sol que
                  se filtra por las ventanas y observa el mundo pasar mientras
                  disfrutas de tu café matutino. La Habitación con Vista a la
                  Calle está diseñada pensando en tu comodidad. Cuenta con una
                  cama espaciosa, un baño privado y todas las comodidades
                  modernas que necesitas. Este espacio es ideal para parejas que
                  buscan un retiro romántico o viajeros que valoran la
                  comodidad. <br /> <br /> Además, nuestra ubicación
                  privilegiada significa que estarás a pocos pasos de las
                  atracciones más emocionantes de Jauja. Cuando regreses después
                  de un día de exploración, te espera un oasis de tranquilidad
                  en tu habitación. Si buscas una experiencia de alojamiento
                  memorable en Jauja, nuestra Habitación con Vista a la Calle es
                  la elección perfecta. Disfruta de un espacio elegante,
                  comodidades de primera clase y la oportunidad de sumergirte en
                  la vida vibrante de la ciudad, todo a un precio excepcional.
               </p>
            }
            price={70}
            characteristics={[
               "Cama 2 plazas",
               "2 adultos y 1 niño",
               "Vista a la calle",
            ]}
            amenities={["Televisor 49'", "Wi-Fi", "Agua Caliente"]}
            services={["Cochera (Gratis)", "Servicio de Tours"]}
            urlImages={["/fotos__hospedaje/401.jpg"]}
            recommendedRooms={[
               {
                  href: "/habitacion-estandar",
                  src: "/fotos__hospedaje/303-1.jpg",
                  name: `Habitación Estándar`,
                  description: "Ideal para persona sola o parejas",
                  price: 60,
               },
               {
                  href: "/habitacion-elegante-matrimonial",
                  src: "/fotos__hospedaje/301-1.jpg",
                  name: "Habitación Elegante Matrimonial",
                  description: "Ideal para parejas",
                  price: 80,
               },
               {
                  href: "/habitacion-matrimonial-superior",
                  src: "/fotos__hospedaje/201-1.jpg",
                  name: "Habitación Matrimonial Superior",
                  description: "Ideal para parejas",
                  price: 100,
               },
            ]}
            backgroundImage="bg-[url('/fotos__hospedaje/401.jpg')]"
         />
      </main>
   );
}
