import type { Metadata } from "next";
import { Anta, Poppins } from "next/font/google";

import "./globals.css";

// Anta = ponctuation tech (titres, en-têtes) ; Poppins = corps. Cf. DESIGN (UX-DR6).
const anta = Anta({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anta",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CRM Solutix",
  description: "Cockpit de prospection et gestion client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${anta.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
