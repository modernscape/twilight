"use client"

import Link from "next/link"
import {Instagram} from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-10 h-32 flex items-center justify-between bg-white">
      {/* 左下リンク */}
      <div className="flex gap-8 text-[10px] font-black tracking-widest uppercase">
        <Link href="/about" className="hover:line-through">
          About
        </Link>
        <Link href="/about#selection" className="hover:line-through">
          Selection
        </Link>
      </div>

      {/* 右下情報 */}
      <div className="flex items-center gap-6">
        <p className="text-[9px] font-bold tracking-widest opacity-40">© 2019. IMA:ZINE.</p>
        <Instagram size={18} strokeWidth={1.5} className="cursor-pointer hover:opacity-50 transition-opacity" />
      </div>
    </footer>
  )
}
