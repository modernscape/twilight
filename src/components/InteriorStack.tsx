"use client"

import {useRef} from "react"
import {motion, useScroll, useTransform, MotionValue} from "framer-motion"
import Image from "next/image"

const images = ["/hero-texture-1.jpeg", "/hero-texture-2.jpeg", "/hero-texture-3.jpeg", "/hero-texture-4.jpeg"]

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
      className="absolute w-full max-w-[700px] aspect-[16/10]"
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={`${basePath}${src}`}
          alt={`Interior ${index}`}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
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
    /* h-[400vh] くらいにすると、1枚ずつの滞在時間が長くなり、ゆったり重なります */
    <div ref={containerRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
        {images.map((src, index) => (
          <StackCard key={src} src={src} index={index} total={images.length} basePath={basePath} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}
