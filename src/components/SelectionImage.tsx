"use client"

import {useRef} from "react"
import Image from "next/image"
import {motion, useScroll, useTransform} from "framer-motion"

interface SelectionItemProps {
  item: {
    id: string
    title: string
    img: string
  }
  basePath: string
}

export default function SelectionImage({item, basePath}: SelectionItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  // ✨ ポイント: useState/useEffect を使わず、直接関数でコンテナを返す
  const {scrollYProgress} = useScroll({
    target: ref,
    container: {
      current: typeof window !== "undefined" ? (document.getElementById("main-scroll-container") as HTMLElement) : null,
    },
    offset: ["start end", "end start"],
  })

  // --- 以下、フィルタやスケールのロジックはそのまま ---
  const filterValue = useTransform(
    scrollYProgress,
    [0, 0.3, 0.35, 0.4, 0.6, 0.65, 0.7, 1],
    [
      "grayscale(100%)",
      "grayscale(95%)",
      "grayscale(90%)",
      "grayscale(0%)",
      "grayscale(0%)",
      "grayscale(90%)",
      "grayscale(95%)",
      "grayscale(100%)",
    ],
  )
  const opacityValue = useTransform(scrollYProgress, [0, 0.25, 0.65, 1], [0.3, 1, 1, 0.3])
  const scaleValue = useTransform(scrollYProgress, [0, 0.45, 1], [1.05, 1, 1.05])

  return (
    <div ref={ref} className="flex flex-col items-center w-full mb-24 md:mb-26">
      <motion.div style={{opacity: opacityValue}} className="mb-8 flex items-center gap-6">
        <span className="text-[10px] font-black opacity-40">{item.id}</span>
        <h3 className="text-sm font-black tracking-[0.3em] uppercase">{item.title}</h3>
      </motion.div>

      <div className="relative w-full max-w-[1000px] overflow-hidden">
        <motion.div style={{filter: filterValue, scale: scaleValue}} className="w-full">
          <Image
            src={`${basePath}${item.img}`}
            alt={item.title}
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
            priority={item.id === "01"}
          />
        </motion.div>
      </div>
    </div>
  )
}
