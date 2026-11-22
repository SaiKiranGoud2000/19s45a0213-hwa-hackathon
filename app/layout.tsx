import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PawClock | The PawClock Tower",
  description:
    "PawClock presents the PawClock Tower: a battery-free wind-up puzzle with six chambers that keeps dogs happily busy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
