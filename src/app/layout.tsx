import type { Metadata } from "next";
import { Montserrat, Pinyon_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Wedding Celebration",
  description: "A digital invitation for our wedding.",
};

import MusicPlayer from "@/components/UI/MusicPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${pinyonScript.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans bg-sage text-ivory">
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}

