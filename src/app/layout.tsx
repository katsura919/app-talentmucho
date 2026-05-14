import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TalentMucho",
  description: "Scale your team without the stress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        manrope.variable,
        cormorantGaramond.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}
