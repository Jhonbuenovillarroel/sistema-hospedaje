import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import { Session } from "next-auth";
import Loading from "./loading";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospedaje El Rinconcito",
  description:
    "Hospedaje el Rinconcito en Jauja, disfruta de habitaciones cómodas y comfortables en el corazón de Jauja",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <Providers session={session}>
        <body className={raleway.className}>
          <Toaster
            toastOptions={{
              style: {
                color: "#fff",
              },
            }}
          />
          <Header />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
