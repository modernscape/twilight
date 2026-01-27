"use client"

import {motion} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {Instagram} from "lucide-react"

export default function AboutPage() {
  const basePath = process.env.NODE_ENV === "production" ? "/twilight" : ""

  // 型エラーを回避するための transition 設定
  const fadeInUp = {
    initial: {opacity: 0, y: 30},
    whileInView: {opacity: 1, y: 0},
    viewport: {once: true},
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1] as const,
    },
  }

  const selectionItems = [
    {id: "01", title: "Industrial Texture", img: "/img-01.png"},
    {id: "02", title: "Ambient Light", img: "/img-02.png"},
    {id: "03", title: "Minimalist Form", img: "/img-03.png"},
    {id: "04", title: "Tokyo Fragment", img: "/img-04.png"},
  ]

  return (
    <main className="min-h-screen w-full bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* --- HEADER --- */}
      <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-10 z-[100] bg-white/90 backdrop-blur-sm">
        <Link href="/">
          <Image src={`${basePath}/logo.png`} alt="logo" width={100} height={30} className="w-auto h-6 md:h-7 object-contain" />
        </Link>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold tracking-[0.2em] leading-none">ME</span>
          <span className="text-[10px] font-bold tracking-[0.2em] leading-none">NU</span>
        </div>
      </nav>

      <div className="pt-40 pb-32 px-6 md:px-0 flex flex-col items-center">
        {/* --- ABOUT SECTION --- */}
        <motion.section {...fadeInUp} className="w-full max-w-[800px] mb-40 text-center">
          <h2 className="text-xl font-bold tracking-[0.4em] uppercase mb-4">ABOUT</h2>
          <div className="w-8 h-[2px] bg-black mx-auto mb-12" />

          <div className="space-y-6 text-[13px] md:text-sm leading-[2.2] tracking-[0.15em] mb-20">
            <p>2017年6月に、大阪・中津にてオープンしたショップです。</p>
            <p>伝えるべき今を僕らの眼で選び抜き、新しい価値観を創造します。</p>
            <p>珈琲を飲むように、本を読むように、絵を見るように、</p>
            <p>僕たちの今を覗きに、遊びに来ていただけると嬉しいです。</p>
            <p>皆様にお会いできることを心より楽しみにしています。</p>
          </div>

          {/* Shop Info with Image */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 text-left">
            <div className="relative w-full max-w-[400px] aspect-[4/3] overflow-hidden">
              <Image src={`${basePath}/img-01.png`} alt="Shop" fill className="object-cover" />
            </div>
            <div className="text-[11px] md:text-xs tracking-widest space-y-6 pt-4">
              <div className="flex gap-8">
                <span className="font-bold w-20 uppercase">ADDRESS</span>
                <span>
                  〒531-0071 大阪市北区中津3-30-4
                  <br />
                  <span className="border-b border-black cursor-pointer">google map</span>
                </span>
              </div>
              <div className="flex gap-8">
                <span className="font-bold w-20 uppercase">TEL&FAX</span>
                <span>06-7506-9378</span>
              </div>
              <div className="flex gap-8">
                <span className="font-bold w-20 uppercase">OPEN</span>
                <span>12:00-21:00</span>
              </div>
              <div className="flex gap-8">
                <span className="font-bold w-20 uppercase">instagram</span>
                <span className="border-b border-black cursor-pointer">@imazine_osk</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- SELECTION SECTION --- */}
        <motion.section
          id="selection"
          // 1. スクロール停止位置をさらに深く設定 (ヘッダーとの距離を確保)
          className="scroll-mt-60 w-full max-w-[1000px] mb-40 text-center"
          // 2. アニメーションの開始位置を大きく下（y: 100）に設定
          initial={{opacity: 0, y: 30}}
          // 3. 画面内に入ってから発火するタイミングを調整
          whileInView={{opacity: 1, y: 0}}
          // 4. ジャンプ直後に発火して位置がズレるのを防ぐため、margin を厳しめに設定
          viewport={{
            once: true,
            margin: "-20% 0px -20% 0px", // 画面の上下20%に入った時に発火
          }}
          transition={{
            duration: 1.2, // 距離が長いので、少し時間をかけて優雅に
            ease: [0.22, 1, 0.36, 1] as const, // IMA:ZINEらしい、スッと止まる高級感のあるイージング
          }}
        >
          <h2 className="text-xl font-bold tracking-[0.4em] uppercase mb-4">SELLECTION</h2>
          <div className="w-8 h-[2px] bg-black mx-auto mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {selectionItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-[10px] font-bold opacity-30">{item.id}</span>
                  <h3 className="text-sm font-bold tracking-[0.2em] uppercase">{item.title}</h3>
                </div>
                <div className="relative w-full aspect-video overflow-hidden group">
                  <Image
                    src={`${basePath}${item.img}`}
                    alt={item.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* --- MORE INFORMATION (Company Info) --- */}
        <motion.section {...fadeInUp} className="w-full max-w-[900px] text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-20">more information +</p>
          <h2 className="text-sm font-bold tracking-[0.4em] mb-16">会社概要</h2>

          <div className="relative flex flex-col md:flex-row justify-center items-center md:items-stretch gap-10 md:gap-20 text-left text-[11px] md:text-xs tracking-widest">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black" />

            {/* Left Column */}
            <div className="space-y-6 w-full md:w-[300px]">
              <div className="flex justify-between">
                <span className="opacity-60">会社名</span>
                <span className="font-bold">株式会社IMA-ZINE</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">設立</span>
                <span className="font-bold">2017年6月</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">代表取締役</span>
                <span className="font-bold">岩井祐二</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">資本金</span>
                <span className="font-bold">200万円</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 w-full md:w-[300px]">
              <div className="flex justify-between items-start">
                <span className="opacity-60">所在地</span>
                <span className="font-bold text-right">大阪市北区中津3-30-4</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="opacity-60">事業内容</span>
                <span className="font-bold text-right">衣類小売業、出版及び編集業</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">TEL</span>
                <span className="font-bold text-right">06-7506-9378</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">URL</span>
                <span className="font-bold text-right border-b border-black">http://imazine.osaka/</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <footer className="w-full border-t border-black px-6 md:px-10 h-24 flex items-center justify-between">
        <div className="flex gap-8 text-[10px] font-black tracking-widest uppercase">
          <Link href="/about" className="hover:line-through">
            About
          </Link>
          <Link href="/about" className="hover:line-through">
            Selection
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <p className="text-[9px] font-bold tracking-widest opacity-40">© 2019. IMA:ZINE.</p>
          <Instagram size={18} strokeWidth={1.5} className="cursor-pointer" />
        </div>
      </footer>
    </main>
  )
}
