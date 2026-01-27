"use client"

import {useState} from "react"
import Image from "next/image"
import {motion, AnimatePresence} from "framer-motion"
import {Instagram} from "lucide-react"

import logoImg from "@/public/logo.png"
import heroImg from "@/public/hero-texture.jpg"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="relative h-[100dvh] w-full bg-white overflow-hidden flex flex-col font-sans">
      {/* 1. 左上ロゴ（変数 logoImg を使う） */}
      <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[100]">
        <Image src={logoImg} alt="logo" width={110} height={35} className="w-auto h-7 md:h-9" />
      </div>

      {/* 2. ページ上の固定「MENU」ボタン */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setIsOpen(true)}
            className="fixed top-0 right-0 p-6 md:p-10 border-l border-b border-black bg-white z-[80] hover:bg-black hover:text-white transition-colors"
          >
            <span className="text-[10px] font-black tracking-[0.2em] text-center">MENU</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 3. メインレイアウト */}
      <div className="flex-1 flex flex-col md:flex-row w-full mt-16 md:mt-0">
        {/* 左：中央テキスト */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="text-center px-4">
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter border-b-[12px] md:border-b-[20px] border-black pb-2 leading-[0.8]">
              twilight
            </h1>
            <p className="mt-6 text-[10px] md:text-xs tracking-[0.6em] font-bold uppercase opacity-80">Tokyo / Japan</p>
          </div>
        </div>

        {/* 右：コンクリート画像エリア（四方に余白を配置） */}
        <div className="flex-1 relative p-6 md:p-12 lg:p-16 lg:pb-0">
          {/* この p-xx が画像周囲の白い余白になります */}
          <div className="relative w-full h-full border border-black overflow-hidden shadow-sm">
            <Image src={heroImg} alt="Visual" fill className="object-cover" priority />
          </div>
        </div>
      </div>

      {/* 4. 下部フッターエリア (常時表示) */}
      <div className="h-24 w-full bg-white flex items-center justify-between px-6 md:px-10 z-50">
        <div className="flex space-x-8 text-[10px] font-black tracking-[0.2em]">
          <a href="#" className="hover:line-through transition-all">
            ABOUT
          </a>
          <a href="#" className="hover:line-through transition-all">
            SELECTION
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <p className="text-[9px] font-black tracking-[0.2em] hidden sm:block uppercase opacity-50">© 2026. twilight</p>
          <a href="#" className="hover:scale-125 transition-transform">
            <Instagram size={18} strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* 5. 右からスライドメニュー */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-[110]"
            />
            <motion.div
              initial={{x: "100%"}}
              animate={{x: 0}}
              exit={{x: "100%"}}
              transition={{type: "spring", damping: 25, stiffness: 200}}
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-[120] border-l border-black flex flex-col"
            >
              {/* メニュー内アニメーションボタン */}
              <button
                onClick={() => setIsOpen(false)}
                className="self-end p-6 md:p-10 border-l border-b border-black w-full flex flex-col items-center justify-center space-y-2 group bg-white"
              >
                <div className="relative w-8 h-4 flex items-center justify-center">
                  <motion.div
                    variants={{closed: {rotate: 0}, open: {rotate: 45}}}
                    initial="closed"
                    animate="open"
                    transition={{delay: 0.2}}
                    className="absolute w-8 h-[2.5px] bg-black"
                  />
                  <motion.div
                    variants={{closed: {rotate: 0}, open: {rotate: -45}}}
                    initial="closed"
                    animate="open"
                    transition={{delay: 0.2}}
                    className="absolute w-8 h-[2.5px] bg-black"
                  />
                </div>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase mt-1">Close</span>
              </button>

              <nav className="flex flex-col space-y-12 text-right p-10 mt-10">
                {["ONLINE STORE", "ABOUT", "SELECTION"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-lg font-black tracking-[0.2em] hover:italic hover:opacity-50 transition-all uppercase"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
