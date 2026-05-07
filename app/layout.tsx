import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://sergio-cobos-web.vercel.app"),
  title: "Sergio Cobos | Research Engineer",
  description:
    "Research Engineer working at the intersection of AI Engineering, LLMs, empirical Software Engineering, and open-source communities.",
  openGraph: {
    title: "Sergio Cobos | Research Engineer",
    description:
      "AI Engineering, LLMs, empirical Software Engineering, and open-source community research.",
    url: "https://sergio-cobos-web.vercel.app",
    siteName: "Sergio Cobos",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sergio Cobos, Research Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergio Cobos | Research Engineer",
    description:
      "AI Engineering, LLMs, empirical Software Engineering, and open-source community research.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
