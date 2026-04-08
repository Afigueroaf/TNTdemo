import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ErrorTrackingInitializer } from "./error-tracking-initializer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TNT Demo Inmersivo",
  description: "Modelo demo para experiencia web inmersiva institucional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={montserrat.variable}>
        <ErrorTrackingInitializer />
        {children}
      </body>
    </html>
  );
}
