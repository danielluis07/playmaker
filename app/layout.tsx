import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import { SheetProvider } from "@/providers/sheet-provider";
import { QueryProvider } from "@/providers/query-provider";

const cloisterBlack = localFont({
  src: "./fonts/CloisterBlack.ttf",
  variable: "--font-cloister-black",
});

const merriweatherSans = localFont({
  src: "./fonts/MerriweatherSans-VariableFont_wght.ttf",
  variable: "--font-merriweather-sans",
});

const lora = localFont({
  src: "./fonts/Lora-VariableFont_wght.ttf",
  variable: "--font-lora",
  weight: "400 500 600 700",
});

export const metadata: Metadata = {
  title: "Playmaker | Tudo sobre NBA e NFL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${cloisterBlack.variable} ${merriweatherSans.variable} max-w-[1920px] mx-auto`}>
        <QueryProvider>
          <Header />
          <SheetProvider />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
