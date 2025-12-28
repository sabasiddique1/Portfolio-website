import type React from "react"
import "@/app/globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StructuredData } from "@/components/structured-data"
import { Toaster } from "@/components/ui/toaster"

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata = {
  title: "Sabaa Siddique | Front-End Developer & UI/UX Designer | React, Next.js Specialist",
  description: "Front-End Developer with 2+ years building high-performance web apps. Improved load speeds by 40%, resolved 100+ production bugs, and boosted performance by 25%. Expert in React, Next.js, TypeScript, and modern UI/UX design.",
  keywords: ["Front-End Developer", "React Developer", "Next.js Developer", "UI/UX Designer", "TypeScript", "Web Developer", "Portfolio"],
  authors: [{ name: "Sabaa Siddique" }],
  creator: "Sabaa Siddique",
  openGraph: {
    title: "Sabaa Siddique | Front-End Developer & UI/UX Designer",
    description: "Front-End Developer with 2+ years building high-performance web apps. Improved load speeds by 40%, resolved 100+ production bugs.",
    url: "https://your-portfolio-domain.com", // TODO: Replace with actual domain
    siteName: "Sabaa Siddique Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // TODO: Create og-image.png (1200x630px)
        width: 1200,
        height: 630,
        alt: "Sabaa Siddique - Front-End Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabaa Siddique | Front-End Developer & UI/UX Designer",
    description: "Front-End Developer with 2+ years building high-performance web apps.",
    creator: "@your-twitter-handle", // TODO: Add your Twitter handle
    images: ["/og-image.png"],
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
  verification: {
    // TODO: Add verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <StructuredData />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}