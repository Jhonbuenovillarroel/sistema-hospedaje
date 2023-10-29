import RoomDetails from "@/components/RoomDetails";

export default function HabitacionEstandar() {
   return (
      <main>
         <RoomDetails
            name="Habitación Elegante Matrimonial"
            subtitle="Ideal para parejas"
            descriptionTitle="Experimenta la Comodidad y Encanto en Nuestra Habitación con Vista a la Calle Especial"
            descriptionContent={
               <p className="mt-8 leading-7 md:leading-8">
                  En Hospedaje &quot;El Rinconcito&quot;, te presentamos nuestra
                  Habitación Elegante Matrimonial con vista a la calle, donde la
                  amplitud y el confort se unen para brindarte una experiencia
                  inolvidable en Jauja. Esta habitación espaciosa y acogedora te
                  permite disfrutar de vistas impresionantes de la ciudad
                  mientras te relajas en un ambiente elegante y cómodo. <br />{" "}
                  <br /> Desde el momento en que ingreses, te sumergirás en un
                  espacio diseñado pensando en tu bienestar. El mobiliario
                  cuidadosamente seleccionado y los detalles de diseño crean una
                  atmósfera acogedora que te hará sentir como en casa. La vista
                  a la calle añade un toque especial, permitiéndote observar la
                  vida de Jauja desde la comodidad de tu habitación. La
                  Habitación con Vista a la Calle está equipada con todo lo que
                  necesitas para una estancia excepcional, desde una cama
                  espaciosa hasta un moderno baño privado. Es el lugar ideal
                  para parejas en busca de un refugio romántico o para viajeros
                  que valoran el espacio y el confort durante su estadía. <br />{" "}
                  <br />
                  Además, nuestra ubicación estratégica en el corazón de Jauja
                  significa que estarás cerca de los lugares más emocionantes de
                  la ciudad. Después de explorar, regresa a tu habitación y
                  relájate en un ambiente de serenidad y elegancia. Si buscas un
                  alojamiento asequible en Jauja, nuestra Habitación con Vista a
                  la Calle de 90 soles es la elección perfecta. Disfruta de un
                  ambiente impresionante, comodidades excepcionales y la
                  oportunidad de sumergirte en la vida de Jauja desde la
                  comodidad de tu habitación.
               </p>
            }
            price={80}
            characteristics={[
               "Cama 2 plazas",
               "2 adultos y 1 niño",
               "Vista a la calle",
            ]}
            amenities={["Televisor 51'", "Wi-Fi", "Agua Caliente"]}
            services={["Cochera (Gratis)", "Servicio de Tours"]}
            urlImages={[
               "/fotos__hospedaje/301-1.jpg",
               "/fotos__hospedaje/301-2.jpg",
            ]}
            // recommendedRooms={[
            //    {
            //       href: "/habitacion-estandar",
            //       src: "/fotos__hospedaje/303-1.jpg",
            //       name: `Habitación Estándar`,
            //       description: "Ideal para persona sola o parejas",
            //       price: 60,
            //    },
            //    {
            //       href: "/habitacion-elegante-matrimonial",
            //       src: "/fotos__hospedaje/301-1.jpg",
            //       name: "Habitación Elegante Matrimonial",
            //       description: "Ideal para parejas",
            //       price: 80,
            //    },
            //    {
            //       href: "/habitacion-matrimonial-superior",
            //       src: "/fotos__hospedaje/201-1.jpg",
            //       name: "Habitación Matrimonial Superior",
            //       description: "Ideal para parejas",
            //       price: 100,
            //    },
            // ]}
            backgroundImage="bg-[url('/fotos__hospedaje/301-1.jpg')]"
         />
      </main>
   );
}
