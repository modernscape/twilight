"use client"

import {useState, useEffect} from "react" // useEffectを追加
import Image from "next/image"
import {motion, AnimatePresence} from "framer-motion"
import Menu from "../components/Menu"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  // 画像切り替え用のステート
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  const basePath = process.env.NODE_ENV === "production" ? "/twilight" : ""

  // 画像のリスト
  const images = [
    `${basePath}/hero-texture-1.jpeg`,
    `${basePath}/hero-texture-2.jpen`,
    `${basePath}/hero-texture-3.jpeg`,
    `${basePath}/hero-texture-4.jpeg`,
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

  return (
    // <main className="relative h-[100dvh] w-full bg-white overflow-hidden flex flex-col font-sans text-black">
    // {/* // <main className="relative h-[100dvh] w-full bg-white overflow-hidden flex flex-col items-center justify-center"> */}
    // {/* 3. メインレイアウト */}
    <div className="flex-1 flex flex-col md:flex-row w-full relative h-full">
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
      {/* 共通メニューコンポーネントを呼び出す */}
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
