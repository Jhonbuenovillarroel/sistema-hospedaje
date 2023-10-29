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
                  En Hospedaje El Rinconcito, sabemos que la tranquilidad es un
                  tesoro en sí mismo. Nuestra Habitación Interior te ofrece un
                  remanso de serenidad en el corazón de Jauja, a un precio que
                  se adapta a tu presupuesto. Aunque esta habitación no tiene
                  vista a la calle, te sorprenderá con su comodidad y encanto.
                  Aquí encontrarás todo lo que necesitas para una estancia
                  relajante. La decoración acogedora y los detalles
                  cuidadosamente seleccionados crean un ambiente cálido y
                  acogedor. Después de un día de exploración en Jauja, podrás
                  retirarte a esta habitación para descansar en paz, lejos del
                  bullicio de la ciudad. Equipada con comodidades modernas, como
                  una cómoda cama y un baño privado, esta habitación se
                  convierte en tu refugio personal. Además, nuestra ubicación
                  estratégica significa que estarás a solo unos pasos de los
                  lugares más emocionantes de Jauja. Desde el momento en que
                  entras por la puerta, te sumergirás en la auténtica
                  experiencia jaujina. Si buscas una opción de alojamiento
                  cómoda y accesible en Jauja, nuestra Habitación Interior es la
                  elección perfecta. Descubre la tranquilidad a un precio
                  insuperable y experimenta la esencia de Jauja en su máxima
                  expresión.
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
            backgroundImage="bg-[url('/fotos__hospedaje/303-1.jpg')]"
         />
      </main>
   );
}
