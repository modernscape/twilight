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
  const ref = useRef(null)

  // 画像が画面の下端に入ってから、上端へ消えるまでを 0 〜 1 で計測
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // 1. 画像の色の変化 (25%-65%でカラー)
  const filterValue = useTransform(
    scrollYProgress,
    [0, 0.3, 0.35, 0.4, 0.6, 0.65, 0.7, 1],
    [
      "grayscale(100%)", // 0: 画面下（グレー）
      "grayscale(95%)", // 0.3: 30%地点までグレーを維持
      "grayscale(90%)", // 0.35: 30%地点までグレーを維持
      "grayscale(0%)", // 0.4: 40%地点でカラー完了
      "grayscale(0%)", // 0.6: 60%地点までカラー維持
      "grayscale(90%)", // 0.65: 60%地点までカラー維持
      "grayscale(95%)", // 0.7: 70%地点でグレーに戻る
      "grayscale(100%)", // 1: 画面上（グレー）
    ],
  )

  // 2. テキストの透明度の変化 (25%-65%で不透明度100%)
  const opacityValue = useTransform(scrollYProgress, [0, 0.25, 0.65, 1], [0.3, 1, 1, 0.3])

  //   const opacityValue = useTransform(scrollYProgress, [0, 0.25, 0.65, 1], [0.3, 1, 1, 0.3])

  // 3. わずかなズーム演出 (中央付近でジャストサイズ)
  const scaleValue = useTransform(scrollYProgress, [0, 0.45, 1], [1.05, 1, 1.05])

  // ...（中略：useScrollなどのロジック）

  return (
    <div ref={ref} className="flex flex-col items-center w-full mb-24 md:mb-32">
      {/* タイトル部分 */}
      <motion.div style={{opacity: opacityValue}} className="mb-8 flex items-center gap-6">
        <span className="text-[10px] font-black opacity-40">{item.id}</span>
        <h3 className="text-sm font-black tracking-[0.3em] uppercase">{item.title}</h3>
      </motion.div>

      {/* 画像部分：Next.js Imageコンポーネントで最適化 */}
      <div className="relative w-full max-w-[1000px] overflow-hidden">
        <motion.div style={{filter: filterValue, scale: scaleValue}} className="w-full" initial={{filter: "grayscale(100%)"}}>
          <Image
            src={`${basePath}${item.img}`}
            alt={item.title}
            width={1200} // アスペクト比を維持するための基準値
            height={800} // 画像の元サイズに近い比率を入れてください
            className="w-full h-auto object-contain"
            priority={item.id === "01"} // 最初の画像だけ優先読み込みしてLCPを改善
          />
        </motion.div>
      </div>
    </div>
  )
}
