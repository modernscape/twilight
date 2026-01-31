"use client"

import {useRef} from "react"
import {motion, useScroll, useTransform, MotionValue, useMotionValueEvent} from "framer-motion"
import Image from "next/image"
import VerticalIndicator from "./VerticalIndicator"
import {useEffect} from "react"

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
  // 修正：計算の基準を調整
  const segment = 1 / (total > 1 ? total - 1 : 1)
  const start = index * segment
  const end = (index + 1) * segment

  // ✨ 画像が「止まっている」時間と「動き出す」時間の境界線 (0.8 = 8割まで止まる)
  const freezeUntil = start + segment * 0.8

  // 1. スケール：最後の画像以外は、freezeUntilを過ぎてから縮小
  const scale = useTransform(progress, [freezeUntil, end], [1, index === total - 1 ? 1 : 0.85])

  // 2. 不透明度：同じくfreezeUntilを過ぎてからフェードアウト
  const opacity = useTransform(progress, [freezeUntil, end], [1, index === total - 1 ? 1 : 0])

  // 3. 位置の固定 (重要)：
  // スクロールで上に逃げようとする力を、反対方向の y で打ち消して「静止」させます
  // 最後の画像以外は、次の画像が来るまで y を 0（固定）に保つイメージです
  const y = useTransform(
    progress,
    [start, freezeUntil, end],
    [0, 0, index === total - 1 ? 0 : -50], // 最後だけ少し上に逃がすと自然です
  )

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
          priority
        />
      </div>
    </motion.div>
  )
}

export default function InteriorStack({basePath}: {basePath: string}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const {scrollY} = useScroll() // 引数を空にする（＝windowを監視）

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Current Scroll:", latest) // これが出るか確認
    if (latest > 10 && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      // URLにハッシュが含まれている場合のみ実行
      if (window.location.hash) {
        // スクロールされたらハッシュを除去したURLに書き換える
        // (履歴を残さずに書き換えることで、戻るボタンへの影響を防ぐ)
        window.history.replaceState(null, "", window.location.pathname + window.location.search)
      }
    }

    window.addEventListener("scroll", handleScroll, {passive: true})
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    container: {
      current: typeof window !== "undefined" ? document.getElementById("main-scroll-container") : null,
    },
  })

  return (
    <>
      {/* 📱 スマホ用 (Mobile): 縦に画像を並べるだけ */}
      <div className="block md:hidden space-y-4 py-25 mb-10">
        <h2 className="text-xl font-black tracking-[0.5em] uppercase text-center mb-8">SHOP</h2>
        {/* ✨ 画像コンテナ：ここで親の px-6 を打ち消す */}
        <div className="flex flex-col space-y-2 -mx-6 w-screen overflow-x-hidden mb-40 min-h-[500px]">
          {images.map((src, index) => (
            <div key={`mobile-${index}`} className="relative w-full aspect-[16/9]">
              <Image
                src={`${basePath}${src}`} //
                alt={`Interior ${index}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index < 2} // 最初の数枚だけ最優先にする
              />
            </div>
          ))}
        </div>
      </div>

      {/* 💻 PC用 (Desktop): これまでのリッチなスタック演出 */}
      {/* // ✨ ポイント: h-[400vh] でスクロール量は確保しつつ、 // stickyコンテナを h-screen
      ではなく、画像と同じ比率（aspect-[16/9]）に合わせる */}
      <div
        ref={containerRef}
        className="hidden md:block relative h-[800vh] w-full mt-5 landscape:mt-0 mb-20"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "0 800vh", // 高さ800vhであることをブラウザに予約させる
        }}
      >
        <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center">
          {/* ✨ コンポーネント化したインジケーターを配置 */}
          <VerticalIndicator total={images.length} progress={scrollYProgress} />

          <div className="relative w-full aspect-[21/9] max-[1700px]:aspect-[16/9] max-[1400px]:aspect-[16/10] max-[1100px]:aspect-[16/13] transition-[aspect-ratio] duration-500">
            {/* </div> */}
            {/* ABOUT 文字 (画像の上に絶対配置) */}
            <motion.h2
              className="absolute -top-16 left-1/2 -translate-x-1/2 text-xl font-black tracking-[0.5em] uppercase z-[120]"
              style={{opacity: useTransform(scrollYProgress, [0.95, 1], [1, 0])}}
            >
              SHOP
            </motion.h2>
            {/* sticky の高さを h-screen にせず、
        画像の高さ（aspect-[16/9]）に合わせることで上下の余白を消す
      */}
            <div className="sticky top-[20%] left-0 w-full aspect-[16/9] md:aspect-[21/9] flex items-center justify-center h-full">
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
      </div>
    </>
  )
}
