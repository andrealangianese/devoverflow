import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/context/Themes";

const inter = localFont({
  src: "./fonts/Interfont.ttf",
  variable: "--font-inter-local",
  weight: "100 900",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGroteskfont.ttf",
  variable: "--font-space-grotesk-local",
  weight: "300 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Overflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
      <body className="h-full antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
