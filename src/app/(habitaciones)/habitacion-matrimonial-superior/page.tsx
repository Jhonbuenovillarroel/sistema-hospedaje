import RoomDetails from "@/components/RoomDetails";

export default function HabitacionEstandar() {
   return (
      <main>
         <RoomDetails
            name="Habitación Matrimonial Superior"
            subtitle="Ideal para parejas"
            descriptionTitle="Espacios Amplios y Confort Inigualable en Jauja"
            descriptionContent={
               <p className="mt-8 leading-7 md:leading-8">
                  En Hospedaje 'El Rinconcito', te presentamos nuestra
                  Habitación Matrimonial Superior, una experiencia que combina
                  espacio generoso y comodidad en su máxima expresión. Esta
                  habitación te ofrece un ambiente elegante y acogedor para que
                  te sientas como en casa mientras exploras Jauja. Desde el
                  momento en que ingreses, te envolverá una atmósfera de comfort
                  y serenidad. Cada detalle ha sido cuidadosamente seleccionado
                  para brindarte la máxima comodidad. <br /> <br /> La amplitud
                  de esta habitación te permitirá moverte con libertad y
                  relajarte en un ambiente de refinamiento. La Habitación está
                  equipada con todas las comodidades, desde una cama espaciosa
                  hasta baño privado. Es el refugio perfecto para parejas en
                  busca de un alojamiento cómodo o para aquellos que desean
                  disfrutar de una estadía inolvidable en Jauja. <br /> <br />{" "}
                  Además, nuestra ubicación central en el corazón de Jauja
                  significa que estarás a pocos pasos de las atracciones más
                  emocionantes de la ciudad. Después de un día de exploración,
                  regresa a tu habitación y sumérgete en un oasis de confort y
                  elegancia. Si buscas una experiencia de alojamiento agradable
                  en Jauja, nuestra Habitación Matrimonial Superior de 110 soles
                  es la elección perfecta. Disfruta del espacio y el confort en
                  su máxima expresión, junto con la oportunidad de experimentar
                  la belleza de Jauja desde la comodidad de tu habitación.
               </p>
            }
            price={100}
            characteristics={[
               "Cama Queen",
               "2 adultos y 1 niño",
               "Vista a la calle",
            ]}
            amenities={["Televisor 51'", "Wi-Fi", "Agua Caliente"]}
            services={["Cochera (Gratis)", "Servicio de Tours"]}
            urlImages={[
               "/fotos__hospedaje/201-1.jpg",
               "/fotos__hospedaje/201-3.jpg",
               "/fotos__hospedaje/201-3.jpg",
            ]}
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
                  href: "/habitacion-matrimonial-clasica",
                  src: "/fotos__hospedaje/401.jpg",
                  name: "Habitación Clásica Matrimonial",
                  description: "Ideal para parejas",
                  price: 70,
               },
            ]}
            backgroundImage="bg-[url('/fotos__hospedaje/201-1.jpg')]"
         />
      </main>
   );
}
