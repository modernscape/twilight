import type {Metadata} from "next"
import "./globals.css"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

export const metadata: Metadata = {
  title: "twilight",
  description: "twilight",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ja">
      <body className="h-[100dvh] flex flex-col bg-white text-black font-sans overflow-hidden">
        <Navigation />
        <main id="main-scroll-container" className="flex-1 relative overflow-y-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
