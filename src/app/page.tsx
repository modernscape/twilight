"use client"

import {useState, useEffect} from "react" // useEffectを追加
import Image from "next/image"
import {motion, AnimatePresence} from "framer-motion"
import {Instagram} from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  // 画像切り替え用のステート
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  const basePath = process.env.NODE_ENV === "production" ? "/twilight" : ""

  // 画像のリスト
  const images = [
    `${basePath}/hero-texture-1.png`,
    `${basePath}/hero-texture-2.png`,
    `${basePath}/hero-texture-3.png`,
    `${basePath}/hero-texture-4.png`,
  ]

  // 5秒ごとに画像をランダムに切り替えるタイマー
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prevIndex) => {
        let nextIndex
        do {
          nextIndex = Math.floor(Math.random() * images.length)
        } while (nextIndex === prevIndex) // 同じ画像が連続しないように
        return nextIndex
      })
    }, 5000) // 5000ms = 5秒

    return () => clearInterval(timer)
  }, [images.length])

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

      {/* 2. 右上固定MENUボタン */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setIsOpen(true)}
            className="fixed top-0 right-0 p-4 md:p-6 bg-white z-[80] hover:bg-black hover:text-white transition-colors"
          >
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Menu</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 3. メインレイアウト */}
      <div className="flex-1 flex flex-col md:flex-row w-full relative">
        {/* コンテンツエリア (SP: 画面中央 / PC: 左側固定幅) */}
        <div className="absolute inset-0 md:relative md:inset-auto md:flex-none md:w-[400px] flex flex-col justify-center items-center p-10 z-20 pointer-events-none md:pointer-events-auto">
          {/* ロゴコンテナ */}
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
              Niigata / Japan
            </p>
          </div>
        </div>

        {/* 画像エリア (SP: 全画面 / PC: 右側可変) */}
        <div className="absolute inset-0 p-0 md:relative md:inset-auto md:flex-1 md:pt-24 md:pl-0 md:pb-12 z-10">
          <div className="relative w-full h-full border-0 overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={currentImgIndex}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 2, ease: "easeInOut"}}
                className="absolute inset-0"
              >
                <Image src={images[currentImgIndex]} alt={`Visual ${currentImgIndex}`} fill className="object-cover" priority />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 4. 統合フッター */}
      <div className="absolute bottom-0 left-0 w-full md:relative bg-transparent md:bg-white z-50 pointer-events-none md:pointer-events-auto">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-10 md:py-0 md:h-24 space-y-8 md:space-y-0 pb-16 md:pb-0">
          <div className="flex space-x-10 md:space-x-8 text-[10px] font-black tracking-[0.2em] pointer-events-auto">
            <a href="/about" className="hover:line-through transition-all uppercase">
              About
            </a>
            <a href="/about#selection" className="hover:line-through transition-all uppercase">
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
              </button>

              <nav className="flex flex-col space-y-12 text-right p-10 mt-10">
                {[
                  {name: "Online Store", href: "https://example.com", isExternal: true},
                  {name: "About", href: "/about", isExternal: false},
                  {name: "Selection", href: "/about#selection", isExternal: false},
                ].map((item) =>
                  item.isExternal ? (
                    // 外部リンク（ストアなど）
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-black tracking-[0.2em] hover:italic hover:opacity-50 transition-all uppercase"
                    >
                      {item.name}
                    </a>
                  ) : (
                    // 内部リンク（About, Selectionアンカー）
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-black tracking-[0.2em] hover:italic hover:opacity-50 transition-all uppercase"
                    >
                      {item.name}
                    </Link>
                  ),
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
