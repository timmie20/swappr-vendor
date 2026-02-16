import { Metadata } from "next";
import { ThemeProvider } from "@/lib/theme-provider";
import TanstackQueryProvider from "@/lib/tanstack-query-provider";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/contexts/UserContext";

import localFont from "next/font/local";

const switzer = localFont({
  src: [
    {
      path: "../../public/fonts/Switzer-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Switzer-VariableItalic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
});

// pages have to be rendered dynamically because supabase server component client uses cookies
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    template: "%s - Swappr",
    default: "Swappr",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${switzer.variable} font-switzer antialiased`}
      >
        <TanstackQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <UserProvider>
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster position="top-right" />
            </UserProvider>
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
