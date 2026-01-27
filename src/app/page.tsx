"use client"

import {useState} from "react"
import Image from "next/image"
import {motion, AnimatePresence} from "framer-motion"
import {Instagram} from "lucide-react"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const basePath = process.env.NODE_ENV === "production" ? "/twilight" : ""

  // ー から X へのアニメーション設定
  const lineVariants = {
    closed: (i: number) => ({
      rotate: 0,
      y: i === 1 ? -3 : 3, // 最初は平行な2本線
      transition: {duration: 0.2},
    }),
    open: (i: number) => ({
      rotate: i === 1 ? 45 : -45,
      y: 0, // 中央で重なって交差
      transition: {delay: 0.2, duration: 0.3}, // メニューのスライド後に動く
    }),
  }

  return (
    <main className="relative h-[100dvh] w-full bg-white overflow-hidden flex flex-col font-sans text-black">
      {/* 1. 左上ロゴ */}
      <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[100]">
        <Image src={`${basePath}/logo.png`} alt="logo" width={110} height={35} className="w-auto h-7 md:h-9 object-contain" />
      </div>

      {/* 2. ページ上の固定「MENU」ボタン (メニューが開いたら消える) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setIsOpen(true)}
            className="fixed top-0 right-0 p-6 md:p-10 border-l border-b border-black bg-white z-[80] hover:bg-black hover:text-white transition-colors"
          >
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Menu</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 3. メインレイアウト */}
      <div className="flex-1 flex flex-col md:flex-row w-full mt-16 md:mt-0">
        <div className="flex-1 flex flex-col justify-center items-center p-10">
          <div className="w-full max-w-[400px] md:max-w-[600px] flex flex-col items-center">
            <div className="w-full border-b-[12px] md:border-b-[20px] border-black pb-6">
              <Image
                src={`${basePath}/logo.png`}
                alt="Main Logo"
                width={800}
                height={300}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <p className="mt-8 text-[10px] md:text-sm tracking-[0.8em] font-bold uppercase opacity-80 text-center">Tokyo / Japan</p>
          </div>
        </div>
        <div className="flex-1 relative pt-6 px-6 md:pt-12 md:px-12 lg:pt-16 lg:px-16 pb-0">
          <div className="relative w-full h-full border-t border-l border-r border-black overflow-hidden shadow-sm">
            <Image src={`${basePath}/hero-texture.jpg`} alt="Visual" fill className="object-cover" priority />
          </div>
        </div>
      </div>

      {/* 4. 常時表示フッター */}
      <div className="h-24 w-full bg-white flex items-center justify-between px-6 md:px-10 z-50 border-t border-black">
        <div className="flex space-x-8 text-[10px] font-black tracking-[0.2em]">
          <a href="#" className="hover:line-through transition-all uppercase">
            About
          </a>
          <a href="#" className="hover:line-through transition-all uppercase">
            Selection
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
              {/* --- メニュー内のアニメーションボタン --- */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-6 md:p-10 border-b border-black w-full flex flex-col items-center justify-center space-y-2 group bg-white"
              >
                <div className="relative w-8 h-4 flex items-center justify-center">
                  <motion.div
                    variants={lineVariants}
                    initial="closed"
                    animate="open"
                    custom={1}
                    className="absolute w-8 h-[2.5px] bg-black"
                  />
                  <motion.div
                    variants={lineVariants}
                    initial="closed"
                    animate="open"
                    custom={2}
                    className="absolute w-8 h-[2.5px] bg-black"
                  />
                </div>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase mt-1">Close</span>
              </button>

              <nav className="flex flex-col space-y-12 text-right p-10 mt-10">
                {["Online Store", "About", "Selection"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={() => setIsOpen(false)}
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
