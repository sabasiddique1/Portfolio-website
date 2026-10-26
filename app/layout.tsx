import type React from "react"
import type { Metadata, Viewport } from "next"
import "@/app/globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"
import { MotionProvider } from "@/components/motion-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StructuredData } from "@/components/structured-data"
import { Toaster } from "@/components/ui/toaster"
import { site } from "@/constants/site"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
})
// TODO: when public/fonts/Gordita-*.woff2 exist, load them with next/font/local as --font-heading; until then headings use Plus Jakarta Sans 600/700 (see --font-heading in globals.css).

// The share image comes from app/opengraph-image.tsx; social card tags are derived from Open Graph.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s | ${site.name}`,
  },
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#04080a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased">
        <StructuredData />
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </MotionProvider>
      </body>
    </html>
  )
}
