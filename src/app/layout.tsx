import type { Metadata } from "next";
// import { Inter, Poppins } from "next/font/google"; // Import Google Fonts
// import "./globals.css";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// const poppins = Poppins({
//   weight: ["400", "500", "600", "700"],
// const poppins = Poppins({
//   weight: ["400", "500", "600", "700"],
//   subsets: ["latin"],
//   variable: "--font-poppins",
// });

export const metadata: Metadata = {
  title: "Arya Pest Control",
  description: "Professional Pest Control Services",
};


import StructuredData from "@/components/common/StructuredData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      {/* <body className={`${inter.variable} ${poppins.variable} antialiased`}> */}
      <body className={`antialiased`}>
        <StructuredData />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
