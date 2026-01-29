// components/SmoothScroll.tsx
"use client"

import {useEffect} from "react"
import Lenis from "lenis"

export default function SmoothScroll_() {
  useEffect(() => {
    // インスタンスの作成
    const lenis = new Lenis({
      duration: 1.2, // スクロールの速さ（秒）
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 慣性の効き方
      smoothWheel: true,
    })

    // 描画ループの中で Lenis を更新
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // クリーンアップ
    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}
