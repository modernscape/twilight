"use client"

import Link from "next/link"
import {Instagram} from "lucide-react"
// import {handleJump_} from "../app/utils/scroll"
// import {scrollToSection} from "../app/utils/scrollToSection"
import SharedTabLink from "./SharedTabLink"

export default function Footer() {
  const handleJump = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // スルスル動かす
        block: "start", // 要素の先頭を画面の上に合わせる
      })
    }
  }

  return (
    <footer className="w-full px-6 md:px-10 h-12 flex items-center justify-between bg-white text-black landscape:py-2 landscape:h-10">
      {/* 左下リンク */}
      <div className="flex gap-4 md:gap-8 text-[10px] font-black tracking-widest uppercase">
        <Link href="/about" className="hover:line-through" onClick={() => handleJump("about")}>
          Shop
        </Link>
        <Link href="/about#selection" className="hover:line-through" onClick={() => handleJump("selection")}>
          Location
        </Link>
        <Link href="/about#company" className="hover:line-through" onClick={() => handleJump("company")}>
          Company
        </Link>
      </div>

      {/* 右下情報 */}
      <div className="flex items-center gap-6">
        <p className="text-[9px] font-bold tracking-widest opacity-40">© 2026 twilight</p>
        {/* <Instagram size={18} strokeWidth={1.5} className="cursor-pointer hover:opacity-50 transition-opacity" /> */}
        {/* <a
          href="https://www.instagram.com/twilight_joetsu_official/"
          target="instagram"
          rel="noopener noreferrer"
          className="hover:opacity-50 transition-opacity"
        >
          <Instagram size={18} strokeWidth={1.5} />
        </a> */}

        <SharedTabLink className="hover:opacity-50 transition-opacity">
          <Instagram size={18} strokeWidth={1.5} />
        </SharedTabLink>
      </div>
    </footer>
  )
}
