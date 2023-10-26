import RoomDetails from "@/components/RoomDetails";

export default function HabitacionEstandar() {
   return (
      <main>
         <RoomDetails
            name="Habitación Estándar"
            subtitle="Ideal para persona sola o parejas"
            descriptionTitle="Descubre la Comodidad, Calidez y Serenidad en Nuestra
            Habitación Interior Especial"
            descriptionContent={
               <p className="mt-8 leading-7 md:leading-8">
                  En Hospedaje &quot;El Rinconcito&quot;, sabemos que la
                  tranquilidad es un tesoro en sí mismo. Nuestra Habitación
                  Interior te ofrece un remanso de serenidad en el corazón de
                  Jauja, a un precio que se adapta a tu presupuesto. Aunque esta
                  habitación no tiene vista a la calle, te sorprenderá con su
                  comodidad y encanto. <br /> <br /> Aquí encontrarás todo lo
                  que necesitas para una estancia relajante. La decoración
                  acogedora y los detalles cuidadosamente seleccionados crean un
                  ambiente cálido y acogedor. Después de un día de exploración
                  en Jauja, podrás retirarte a esta habitación para descansar en
                  paz, lejos del bullicio de la ciudad. Equipada con comodidades
                  modernas, como una cómoda cama y un baño privado, esta
                  habitación se convierte en tu refugio personal. <br /> <br />{" "}
                  Además, nuestra ubicación estratégica significa que estarás a
                  solo unos pasos de los lugares más emocionantes de Jauja.
                  Desde el momento en que entras por la puerta, te sumergirás en
                  la auténtica experiencia jaujina. Si buscas una opción de
                  alojamiento cómoda y accesible en Jauja, nuestra Habitación
                  Interior es la elección perfecta. Descubre la tranquilidad a
                  un precio insuperable y experimenta la esencia de Jauja en su
                  máxima expresión.
               </p>
            }
            price={60}
            characteristics={[
               "Cama 2 plazas",
               "2 adultos y 1 niño",
               "Habitación interior",
            ]}
            amenities={["Televisor 36'", "Wi-Fi", "Agua Caliente"]}
            services={["Cochera (Gratis)", "Servicio de Tours"]}
            urlImages={[
               "/fotos__hospedaje/303-1.jpg",
               "/fotos__hospedaje/303-2.jpg",
            ]}
            recommendedRooms={[
               {
                  href: "/habitacion-matrimonial-clasica",
                  src: "/fotos__hospedaje/401.jpg",
                  name: "Habitación Clásica Matrimonial",
                  description: "Ideal para parejas",
                  price: 70,
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
            backgroundImage="bg-[url('/fotos__hospedaje/303-1.jpg')]"
         />
      </main>
   );
}
