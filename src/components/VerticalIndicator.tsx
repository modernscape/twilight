"use client"

import {motion, useTransform, MotionValue} from "framer-motion"

// ドット単体のコンポーネント
function IndicatorDot({index, total, progress}: {index: number; total: number; progress: MotionValue<number>}) {
  const start = index / total
  const end = (index + 1) / total

  // スクロール位置に合わせて、アクティブなドットだけを強調
  const dotOpacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0.2, 1, 1, 0.2])
  const dotScale = useTransform(progress, [start, start + 0.05, end - 0.05, end], [2, 2.4, 2.4, 2])

  return <motion.div style={{opacity: dotOpacity, scale: dotScale}} className="w-[3px] h-[3px] bg-white rounded-full" />
}

// インジケーター全体のコンポーネント
export default function VerticalIndicator({total, progress}: {total: number; progress: MotionValue<number>}) {
  return (
    <div className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-[110]">
      {/* ラベル */}
      <div className="text-[16px] text-white font-black tracking-[0.3em] mb-2 opacity-80 [writing-mode:vertical-lr] uppercase">Scroll</div>

      {/* ドット列 */}
      <div className="relative flex flex-col gap-4">
        {[...Array(total)].map((_, i) => (
          <IndicatorDot key={`dot-${i}`} index={i} total={total} progress={progress} />
        ))}
        {/* 背景の細い線 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[0.5px] h-full bg-white/10 -z-10" />
      </div>
    </div>
  )
}
