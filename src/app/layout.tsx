import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Hoc/provider";

// Nextjs default layout.tsx file content 
//const geistSans = Geist({
 // variable: "--font-geist-sans",
 // subsets: ["latin"],
//});

const fontFamily = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],

}); 

// Nextjs default layout.tsx file content 
//const geistMono = Geist_Mono({
  //variable: "--font-geist-mono",
  //subsets: ["latin"],
//});

export const metadata: Metadata = {
  title: "Landing Page",
  description: "Landing page using nextjs 15 and tailwindcss 4.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${fontFamily.className} antialiased`}
      >
      <Provider>
        {children}
      </Provider> 
      </body>
    </html>
  );
}
