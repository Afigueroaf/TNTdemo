import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
