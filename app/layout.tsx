import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/context/Themes";
import { Toaster } from "@/components/ui/sonner";
import { Session } from "inspector/promises";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

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

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="h-full antialiased">
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
};
export default RootLayout;
