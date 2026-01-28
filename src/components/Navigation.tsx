"use client"

import {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {motion, AnimatePresence} from "framer-motion"
import Menu from "./Menu"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const basePath = process.env.NODE_ENV === "production" ? "/twilight" : ""

  return (
    <>
      {/* HEADER: ロゴとメニューボタン */}
      <header className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-10 z-[100] bg-white/80 backdrop-blur-sm">
        <Link href="/">
          <Image src={`${basePath}/logo.png`} alt="logo" width={100} height={30} className="w-auto h-6 md:h-7 object-contain" />
        </Link>

        {/* 右上メニューボタン（Borderなし） */}
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 hover:bg-black hover:text-white transition-colors"
            >
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">Menu</span>
            </motion.button>
          )}
        </AnimatePresence>
      </header>

      {/* スライドメニュー */}
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
