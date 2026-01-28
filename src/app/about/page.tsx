"use client"

import {motion} from "framer-motion"
import SelectionImage from "@/src/components/SelectionImage"
import Image from "next/image"

export default function AboutPage() {
  const basePath = process.env.NODE_ENV === "production" ? "/twilight" : ""

  const fadeInUp = {
    initial: {opacity: 0, y: 100},
    whileInView: {opacity: 1, y: 0},
    viewport: {once: true, margin: "-20% 0px -20% 0px"},
    transition: {duration: 1.2, ease: [0.22, 1, 0.36, 1] as const},
  }

  const selectionItems = [
    {id: "01", title: "Industrial Texture", img: "/img-1.png"},
    {id: "02", title: "Ambient Light", img: "/img-2.png"},
    {id: "03", title: "Minimalist Form", img: "/img-3.png"},
    {id: "04", title: "Tokyo Fragment", img: "/img-4.png"},
  ]

  return (
    // ナビゲーションと被らないように pt-40（上の余白）は残します
    <main className="min-h-screen w-full bg-white text-black pt-40 pb-32 px-6 md:px-10 flex flex-col items-center">
      {/* --- ABOUT SECTION --- */}
      <motion.section {...fadeInUp} id="about" className="w-full max-w-[800px] mb-60 text-center">
        <h2 className="text-xl font-black tracking-[0.5em] uppercase mb-16">ABOUT</h2>
        {/* ❌ Line removed: w-8 h-[2px] bg-black */}

        <div className="space-y-8 text-[13px] md:text-sm leading-[2.4] tracking-[0.18em] mb-24 font-medium">
          <p>2017年6月に、大阪・中津にてオープンしたショップです。</p>
          <p>伝えるべき今を僕らの眼で選び抜き、新しい価値観を創造します。</p>
          <p>珈琲を飲むように、本を読むように、絵を見るように、</p>
          <p>僕たちの今を覗きに、遊びに来ていただけると嬉しいです。</p>
          <p>皆様にお会いできることを心より楽しみにしています。</p>
        </div>

        {/* Shop Info with Image */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-16 text-left">
          <div className="relative w-full max-w-[420px] aspect-[4/3] overflow-hidden transition-all duration-700">
            <Image src={`${basePath}/img-0.jpeg`} alt="Shop" fill className="object-cover" />
          </div>

          <div className="text-[11px] md:text-xs tracking-[0.2em] space-y-8 pt-4">
            <div className="flex flex-col gap-2">
              <span className="font-black opacity-30 uppercase text-[9px]">Address</span>
              <span>〒531-0071 大阪市北区中津3-30-4</span>
              <span className="cursor-pointer hover:line-through inline-block w-fit">Google Map</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-black opacity-30 uppercase text-[9px]">Tel & Fax</span>
              <span>06-7506-9378</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-black opacity-30 uppercase text-[9px]">Open</span>
              <span>12:00 - 21:00</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-black opacity-30 uppercase text-[9px]">Instagram</span>
              <span className="cursor-pointer hover:line-through inline-block w-fit">@imazine_osk</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- SELECTION SECTION --- */}
      <motion.section id="selection" className="w-full max-w-[1100px] mb-60 text-center scroll-mt-40">
        <h2 className="text-xl font-black tracking-[0.5em] uppercase mb-24">SELECTION</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          {selectionItems.map((item) => (
            <SelectionImage key={item.id} item={item} basePath={basePath} />
          ))}
        </div>
      </motion.section>

      {/* --- MORE INFORMATION (Company Info) --- */}
      <motion.section {...fadeInUp} id="more" className="w-full max-w-[900px] text-center">
        <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-24 opacity-40">More Information</p>
        <h2 className="text-sm font-black tracking-[0.5em] mb-20">会社概要</h2>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-16 md:gap-32 text-left text-[11px] md:text-xs tracking-[0.15em]">
          {/* ❌ Center Line removed: md:block absolute ... w-[1px] bg-black */}

          <div className="space-y-8 w-full md:w-[320px]">
            <div className="flex justify-between items-end">
              <span className="opacity-40 text-[9px] uppercase font-bold">会社名</span>
              <span className="font-black">株式会社IMA-ZINE</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="opacity-40 text-[9px] uppercase font-bold">設立</span>
              <span className="font-black">2017年6月</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="opacity-40 text-[9px] uppercase font-bold">代表取締役</span>
              <span className="font-black">岩井祐二</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="opacity-40 text-[9px] uppercase font-bold">資本金</span>
              <span className="font-black">200万円</span>
            </div>
          </div>

          <div className="space-y-8 w-full md:w-[320px]">
            <div className="flex justify-between items-start">
              <span className="opacity-40 text-[9px] uppercase font-bold">所在地</span>
              <span className="font-black text-right">大阪市北区中津3-30-4</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="opacity-40 text-[9px] uppercase font-bold">事業内容</span>
              <span className="font-black text-right leading-loose">衣類小売業、出版及び編集業</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="opacity-40 text-[9px] uppercase font-bold">Tel</span>
              <span className="font-black text-right">06-7506-9378</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="opacity-40 text-[9px] uppercase font-bold">URL</span>
              <span className="font-black text-right hover:line-through cursor-pointer">imazine.osaka</span>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
