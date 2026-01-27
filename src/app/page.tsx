"use client"

import {useState} from "react"
import Image from "next/image"
import {motion, AnimatePresence} from "framer-motion"
import {Instagram} from "lucide-react"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const basePath = process.env.NODE_ENV === "production" ? "/twilight" : ""

  const lineVariants = {
    closed: (i: number) => ({
      rotate: 0,
      y: i === 1 ? -3 : 3,
      transition: {duration: 0.2},
    }),
    open: (i: number) => ({
      rotate: i === 1 ? 45 : -45,
      y: 0,
      transition: {delay: 0.2, duration: 0.3},
    }),
  }

  return (
    <main className="relative h-[100dvh] w-full bg-white overflow-hidden flex flex-col font-sans text-black">
      {/* 1. 左上固定ロゴ */}
      <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[100]">
        <Image src={`${basePath}/logo.png`} alt="logo" width={110} height={35} className="w-auto h-7 md:h-9 object-contain" />
      </div>

      {/* 2. 右上固定MENUボタン (SP時は枠線を消してスッキリさせています) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setIsOpen(true)}
            className="fixed top-0 right-0 p-4 md:p-6 bg-white md:bg-white z-[80] hover:bg-black hover:text-white transition-colors"
          >
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Menu</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 3. メインレイアウト */}
      <div className="flex-1 flex flex-col md:flex-row w-full relative">
        {/* コンテンツエリア (中央ロゴ) */}
        <div className="flex-1 flex flex-col justify-center items-center p-10 px-18 z-20 pointer-events-none md:pointer-events-auto">
          <div className="w-[280px] max-w-[280px] md:max-w-[500px] flex flex-col items-center">
            <div className="w-full pb-6 text-center">
              <Image
                src={`${basePath}/logo.png`}
                alt="Main Logo"
                width={800}
                height={300}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <p className="mt-4 text-[10px] md:text-sm tracking-[0em] font-bold uppercase opacity-80 text-center text-black">
              Tokyo / Japan
            </p>
          </div>
        </div>

        {/* 画像エリア (SP: 完全に隙間なし全画面 / PC: 右側) */}
        {/* SP時は p-0 に、PC時は md:p-24 等で余白を維持 */}
        <div className="absolute inset-0 p-0 md:relative md:inset-auto md:flex-[3] md:pt-24 md:pl-0 md:pb-12 z-10">
          <div className="relative w-full h-full border-0 overflow-hidden">
            <Image src={`${basePath}/hero-texture.png`} alt="Visual" fill className="object-cover" priority />
          </div>
        </div>
      </div>

      {/* 4. 統合フッター (SPは全画面画像の上に配置) */}
      <div className="absolute bottom-0 left-0 w-full md:relative bg-transparent md:bg-white z-50 pointer-events-none md:pointer-events-auto">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-10 md:py-0 md:h-24 space-y-8 md:space-y-0 pb-16 md:pb-0">
          <div className="flex space-x-10 md:space-x-8 text-[10px] font-black tracking-[0.2em] pointer-events-auto">
            <a href="#" className="hover:line-through transition-all uppercase">
              About
            </a>
            <a href="#" className="hover:line-through transition-all uppercase">
              Selection
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 pointer-events-auto">
            <p className="text-[10px] md:text-[9px] font-black tracking-[0.2em] uppercase opacity-80 md:opacity-50">© 2026. twilight</p>
            <a href="#" className="hover:scale-125 transition-transform">
              <Instagram strokeWidth={1.5} className="w-6 h-6 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* 5. スライドメニュー */}
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
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-[120] flex flex-col"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="p-6 md:p-10 w-full flex flex-col items-center justify-center space-y-2 bg-white"
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
