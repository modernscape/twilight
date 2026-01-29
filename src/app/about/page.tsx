"use client"

import {motion, useMotionValueEvent, useScroll} from "framer-motion"
import SelectionImage from "@/src/components/SelectionImage"
import Image from "next/image"
import InteriorStack from "@/src/components/InteriorStack"
import {useEffect} from "react"

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

  const {scrollY} = useScroll() // 引数を空にする（＝windowを監視）

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Current Scroll:", latest) // これが出るか確認
    if (latest > 10 && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      console.log("scroll")

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

  return (
    // ナビゲーションと被らないように pt-40（上の余白）は残します
    <div className="min-h-screen w-full bg-white text-black pt-0 pb-12 px-6 md:px-10 flex flex-col items-center">
      {/* --- ABOUT SECTION --- */}
      <motion.section {...fadeInUp} id="about" className="w-full mb-10 text-center scroll-mt-40">
        {/* <h2 className="text-xl font-black tracking-[0.5em] uppercase mb-16">ABOUT</h2> */}
        {/* ✨ 新しい画像スタックコンポーネント */}
        <InteriorStack basePath={basePath} />

        <div className="space-y-8 text-[13px] md:text-sm leading-[2.4] tracking-[0.18em] mb-24 font-medium -mt-30 max-[1500px]:-mt-50">
          <p>
            めまぐるしくも平穏で当たり前の⽇常 ⽇々を彩る⼩さな幸せを感じながら明⽇を愛しく思える⼈⽣でありたい
            <br />
            そんな精神性が”twilight”のコンセプト
            <br />
            <br />
            ⼣暮れや夜明け直前の静けさ＝”薄明”の時間を意味する”twilight”。
            <br />
            <br />
            何かを選び、動き出す前のわずかな瞬間。 その決断をそっと⽀えるような、毎⽇へ寄り添うモノを提案したいと考えます。
            <br />
            <br />
            豊かさと厳しさを併せ持つ四季折々の気候下で朗らかに慎ましく暮らす⼈々のワードローブの⼀助となれるよう、 <br />
            私が”twilight”を通して⼈⽣を懸けて発信していきたいのは、
            <br />
            普遍的な魅⼒を持ったブランド編成によるトレンドに左右されないスタイルです。
          </p>
        </div>

        {/* Shop Info with Image */}
        {/* <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-16 text-left">
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
        </div> */}
      </motion.section>

      {/* --- SELECTION SECTION --- */}
      <motion.section id="selection" className="w-full max-w-[1100px] mb-0 text-center scroll-mt-40">
        <h2 className="text-xl font-black tracking-[0.5em] uppercase mb-24">Location</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {selectionItems.map((item) => (
            <SelectionImage key={item.id} item={item} basePath={basePath} />
          ))}
        </div>

        <div className="space-y-8 text-[13px] md:text-sm leading-[2.4] tracking-[0.18em] mb-30 font-medium">
          <p>
            “新潟県上越市” 新潟県の南⻄部に位置する上越市。 <br />
            市域の中央に流れる関川沿いに開けた平野部を ⼭間部と海岸部が囲み、
            <br />
            変化に富んだ地形と 四季折々の美しい⾃然を有しています。
            <br />
            <br />
            県内3番⽬の⼈⼝規模(約18万⼈)となっており、
            <br />
            戦国武将”上杉謙信”の故郷でもあることから 歴史的資産も多く残っており、
            <br />
            様々な魅⼒が市⺠の豊かな暮らしの輪郭となっています。
            <br />
            (春)⽇本三⼤夜桜のひとつ”⾼⽥城址公園”の 観桜会には全国から多くの観光客が訪れます。
            <br />
            <br />
            (夏) <br />
            アウトドアアクティビティや海産物など ⽇本海からの恩恵は多くありますが、 その中でも⽇本海に沈む⼣⽇は佳景です。 <br />
            (秋) <br />
            平野部に広がる和やかな⽥園⾵景は ⼈々に季節の移ろいを伝えてくれています。
            <br />
            (冬) <br />
            豪雪地帯ならではの雪化粧は四季の コントラストを強める象徴的な要素です。
          </p>
        </div>
      </motion.section>

      {/* --- MORE INFORMATION (Company Info) --- */}
      <motion.section {...fadeInUp} id="more" className="w-full max-w-[1200px] text-center">
        {/* <h2 className="text-sm font-black tracking-[0.5em] mb-20">Company</h2> */}
        <h2 className="text-xl font-black tracking-[0.5em] uppercase mb-24">Company</h2>

        {/* Shop Info with Image */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-16 text-left mb-8">
          <div className="relative w-full w-full md:max-w-[600px] aspect-[4/3] overflow-hidden transition-all duration-700">
            <Image src={`${basePath}/img-0.jpeg`} alt="Shop" fill className="object-cover" />
          </div>

          <div className="text-[11px] md:text-xs tracking-[0.2em] space-y-8 pt-4">
            <div className="flex flex-col gap-2">
              <span className="font-black opacity-30 uppercase text-[9px]">Address</span>
              <span>〒000-00 新潟県上越市◯◯◯◯◯◯</span>
              <span className="cursor-pointer hover:line-through inline-block w-fit">Google Map</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-black opacity-30 uppercase text-[9px]">Tel & Fax</span>
              <span>025-000-0000</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-black opacity-30 uppercase text-[9px]">Open</span>
              <span>12:00 - 21:00</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-black opacity-30 uppercase text-[9px]">Instagram</span>
              <span className="cursor-pointer hover:line-through inline-block w-fit">@twilight</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-black opacity-30 uppercase text-[9px]">access</span>
              <span> □ JR北陸新幹線 (東京-上越妙⾼/約2時間) 上越妙⾼駅より⾞で約15分</span>
              <span> □ 北陸⾃動⾞道 上越インターチェンジより⾞で約10分</span>
              <span> □ 上信越⾃動⾞道 上越⾼⽥インターチェンジより⾞で約15分</span>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-16 md:gap-32 text-left text-[11px] md:text-xs tracking-[0.15em]">
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
        </div> */}
      </motion.section>

      {/* --- MORE INFORMATION (Company Info) --- */}
      <motion.section {...fadeInUp} id="" className="w-full max-w-[900px] text-center">
        {/* <h2 className="text-sm font-black tracking-[0.5em] mb-20">Company</h2> */}

        {/* Shop Info with Image */}
        <div className="flex flex-col items-center justify-center gap-10 text-left mb-0 w-full">
          {/* テキストエリア：読みやすさのため幅を制限して中央配置 */}
          <div className="space-y-8 text-[13px] md:text-sm leading-[2.4] tracking-[0.18em] font-medium">
            {/* <p className="whitespace-pre-wrap leading-relaxed px-0 md:px-30 text-[14px] bold mb-0">
              □ JR北陸新幹線 (東京-上越妙⾼/約2時間) 上越妙⾼駅より⾞で約15分
              <br />
              □ 北陸⾃動⾞道 上越インターチェンジより⾞で約10分
              <br />□ 上信越⾃動⾞道 上越⾼⽥インターチェンジより⾞で約15分
            </p> */}
            <p className="whitespace-pre-wrap leading-relaxed px-0 md:px-30">
              <br />
              <br />
              “twilight”は上越市の中⼼地である⾼⽥エリア 周辺の平野部に位置します。
              <br />
              以下に記載した市内の主要陸路からのアクセスに優れた場所でありながら、
              <br />
              ⼟地の270度を⽥園に囲まれた⻑閑なロケーションが建設地です。
              <br />
              ⼣陽と相性の良い⽅⾓に店舗部分を配しています。
              <br />
              <br />
              “店舗兼住宅である特性”と”コンセプト”を 尊重すべく、
              <br />
              あえて商業地域への出店は避け、お店は勿論ですが私⾃⾝も
              <br />
              この地にきちんと 根差した⽇常を積み重ねていくことが主眼です。
            </p>
          </div>
          {/* 画像エリア：w-fullで横幅を最大にし、aspect比を画像に合わせる */}
          <div className="relative w-full aspect-[4/3] transition-all duration-700">
            <Image
              src={`${basePath}/map.png`}
              alt="Shop"
              fill
              priority // 重要な画像であれば優先読み込み
              className="object-contain" // 画像全体を収める
            />
          </div>
        </div>

        {/* <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-16 md:gap-32 text-left text-[11px] md:text-xs tracking-[0.15em]">
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
        </div> */}
      </motion.section>
    </div>
  )
}
