"use client"

import {useRef} from "react"
import {motion, useScroll, useTransform, MotionValue} from "framer-motion"
import Image from "next/image"
import VerticalIndicator from "./VerticalIndicator"

const images = [
  "/hero-texture-1.jpeg", //

  "/hero-texture-2.jpeg",

  "/hero-texture-3.jpeg",

  "/hero-texture-4.jpeg",
]

// ✨ 各画像を制御する子コンポーネント
function StackCard({
  src,
  index,
  total,
  basePath,
  progress,
}: {
  src: string
  index: number
  total: number
  basePath: string
  progress: MotionValue<number>
}) {
  const start = index / total
  const end = (index + 1) / total

  // 個別に Hook を呼び出す（これならOK！）
  const scale = useTransform(progress, [start, end], [1, index === total - 1 ? 1 : 0.85])
  const opacity = useTransform(progress, [start, end], [1, index === total - 1 ? 1 : 0])
  const y = useTransform(progress, [start, end], [0, index === total - 1 ? 0 : -40])

  return (
    <motion.div
      style={{
        scale,
        opacity,
        y,
        zIndex: total - index,
      }}
      className="absolute inset-0 w-screen left-1/2 -translate-x-1/2"
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={`${basePath}${src}`}
          alt={`Interior ${index}`}
          fill
          className="object-cover transition-all duration-1000"
          sizes="100vw"
        />
      </div>
    </motion.div>
  )
}

export default function InteriorStack({basePath}: {basePath: string}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    container: {
      current: typeof window !== "undefined" ? document.getElementById("main-scroll-container") : null,
    },
  })

  return (
    // ✨ ポイント: h-[400vh] でスクロール量は確保しつつ、
    // stickyコンテナを h-screen ではなく、画像と同じ比率（aspect-[16/9]）に合わせる
    <div ref={containerRef} className="relative h-[400vh] w-full mt-20 mb-20">
      <div className="sticky top-[15%] left-0 w-full aspect-[16/9] md:aspect-[21/9]">
        {/* ✨ コンポーネント化したインジケーターを配置 */}
        <VerticalIndicator total={images.length} progress={scrollYProgress} />

        {/* ABOUT 文字 (画像の上に絶対配置) */}
        <motion.h2
          className="absolute -top-16 left-1/2 -translate-x-1/2 text-xl font-black tracking-[0.5em] uppercase z-[120]"
          style={{opacity: useTransform(scrollYProgress, [0.95, 1], [1, 0])}}
        >
          ABOUT
        </motion.h2>

        {/* sticky の高さを h-screen にせず、
        画像の高さ（aspect-[16/9]）に合わせることで上下の余白を消す
      */}
        <div className="sticky top-[20%] left-0 w-full aspect-[16/9] md:aspect-[21/9] flex items-center justify-center">
          {images.map((src, index) => (
            <StackCard
              key={`${src}-${index}`}
              src={src}
              index={index}
              total={images.length}
              basePath={basePath}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
