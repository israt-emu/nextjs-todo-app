import type {Metadata} from "next";
import {Nunito} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/ui/theme-provider";
import {ModeToggle} from "./components/navbar/theme";
import {Toaster} from "@/components/ui/toaster";
// import {NoteProvider} from "@/contexts/NoteContext";
const inter = Nunito({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Planify",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="mx-auto">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
