import type {Metadata} from "next"
import {Geist, Geist_Mono} from "next/font/google"
import "./globals.css"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// })

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// })

export const metadata: Metadata = {
  title: "twilight",
  description: "twilight",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ja">
      {/* 画面の高さを100dvhに固定し、縦並びにします */}
      <body className="h-[100dvh] flex flex-col bg-white text-black font-sans overflow-hidden">
        {/* Navigationは浮いているので、ここにあっても高さに影響しません */}
        <Navigation />

        {/* flex-1 を指定することで、メイン領域は 
          「100dvh - フッターの高さ」に自動計算されます 
        */}
        <main className="flex-1 relative overflow-y-auto">{children}</main>

        <Footer />
      </body>
    </html>
  )
}
