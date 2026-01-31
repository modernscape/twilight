"use client"

import {motion, useMotionValueEvent, useScroll} from "framer-motion"
import SelectionImage from "@/src/components/SelectionImage"
import Image from "next/image"
import InteriorStack from "@/src/components/InteriorStack"
import {useEffect} from "react"
import SharedTabLink from "@/src/components/SharedTabLink"
import {Square} from "lucide-react"

export default function AboutPage() {
  const basePath = process.env.NODE_ENV === "production" ? "/twilight" : ""

  const fadeInUp = {
    initial: {opacity: 0, y: 100},
    whileInView: {opacity: 1, y: 0},
    viewport: {once: true, margin: "-20% 0px -20% 0px"},
    transition: {duration: 1.2, ease: [0.22, 1, 0.36, 1] as const},
  }

  const selectionItems = [
    {id: "spring", title: "Castles in the Bloom", img: "/img-1.png"},
    {id: "summer", title: "The Glimmering Horizon", img: "/img-2.png"},
    {id: "autumn", title: "Layered Earth", img: "/img-3.png"},
    {id: "winter", title: "Winter's Edge", img: "/img-4.png"},
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
    <div className="min-h-[100dvh] w-full bg-white text-black pt-0 pb-12 px-6 md:px-10 flex flex-col items-center">
      {/* --- ABOUT SECTION --- */}
      <motion.section {...fadeInUp} id="about" className="w-full mb-10 text-center scroll-mt-20 landscape:scroll-mt-160">
        {/* ✨ 新しい画像スタックコンポーネント */}
        <InteriorStack basePath={basePath} />

        <div
          className="space-y-8 text-[13px] md:text-sm leading-[2.4] tracking-[0.18em] mb-24 font-medium -mt-30 max-[1500px]:-mt-50
                      /* 📱 iPhone横画面(landscape)の時の調整 */
                      landscape:mt-40      /* 重なりを解除して、画像の下に10(40px)の余白を作る */
                      landscape:text-[12px] /* 横画面では少し文字を小さくすると読みやすい */
                      landscape:leading-[2] /* 行間も少し詰めると画面内に収まりやすくなります */
                    "
        >
          <p>
            コンセプトを表現するための空間として⽩を基調としたシンプルな内装に設えました。
            <br />
            壁やカウンターはすべて漆喰の塗り壁仕上げとなっており、
            <br />
            スペースを貫く⽊柱は構造上必要不可⽋だったものをそのままの姿/表情で残すなど、⾃然素材を多⽤しています。
            <br />
            <br />
            “漆喰・無垢材・コンクリート”これら３つのマテリアルの組み合わせや
            <br />
            ⾃然な⾊使いによる内装は住宅部分と
            <br />
            リンクするように設計/デザインされています。
            <br />
            「ライフも、ワークも、⼀括りが良い。」
            <br />
            <br />
            そんな私の理想を叶えるための基盤としてアパレルでは珍しい“店舗兼住宅”のカタチを選びましたので、
            <br />
            店舗部分と住宅部分を区別することなく、両者において構造的にもデザイン的にも”繋がり”を持たせました。
            <br />
            <br />
            <span className="text-[#999] small">＊ 店舗部分の⾯積は約20坪。建設中のため使⽤している画像はイメージパースです</span>
          </p>
        </div>
      </motion.section>

      {/* --- SELECTION SECTION --- */}
      <div className="relative">
        <div id="selection" className="absolute -top-20 md:top-[-120px] invisible"></div>
        <motion.section {...fadeInUp} className="w-full max-w-[1100px] mb-0 text-center scroll-mt-100 landscape:scroll-mt-10">
          <h2 className="text-xl font-black tracking-[0.5em] uppercase mb-10">Location</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {selectionItems.map((item) => (
              <SelectionImage key={item.id} item={item} basePath={basePath} />
            ))}
          </div>

          <div className="space-y-8 text-[13px] md:text-sm leading-[2.4] tracking-[0.18em] mb-30 font-medium">
            <p>
              “新潟県上越市”新潟県の南⻄部に位置する上越市。 <br />
              市域の中央に流れる関川沿いに開けた平野部を⼭間部と海岸部が囲み、
              <br />
              変化に富んだ地形と四季折々の美しい⾃然を有しています。
              <br />
              <br />
              県内3番⽬の⼈⼝規模(約18万⼈)となっており、
              <br />
              戦国武将”上杉謙信”の故郷でもあることから歴史的資産も多く残っており、
              <br />
              様々な魅⼒が市⺠の豊かな暮らしの輪郭となっています。
              <br />
              <br />
              <span className="text-[#555]">春</span>
              <br />
              ⽇本三⼤夜桜のひとつ”⾼⽥城址公園”の観桜会には全国から多くの観光客が訪れます。
              <br />
              <span className="text-[#555]">夏</span>
              <br />
              アウトドアアクティビティや海産物など⽇本海からの恩恵は多くありますが、
              <br />
              その中でも⽇本海に沈む⼣⽇は佳景です。
              <br />
              <span className="text-[#555]">秋</span>
              <br />
              平野部に広がる和やかな⽥園⾵景は⼈々に季節の移ろいを伝えてくれています。
              <br />
              <span className="text-[#555]">冬</span>
              <br />
              豪雪地帯ならではの雪化粧は四季のコントラストを強める象徴的な要素です。
            </p>
          </div>
        </motion.section>
      </div>

      {/* --- MORE INFORMATION (Company Info) --- */}
      <div className="relative">
        <div id="company" className="absolute -top-20 md:top-[-120px] invisible"></div>
        <motion.section {...fadeInUp} className="w-full max-w-[1200px] text-center scroll-mt-20 landscape:scroll-mt-10 mb-10">
          <h2 className="text-xl font-black tracking-[0.5em] uppercase mb-10">Company</h2>

          {/* Shop Info with Image */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-16 text-left mb-10 md:mb-14">
            <div className="relative w-full w-full md:max-w-[600px] flex-shrink-0 aspect-[4/3] overflow-hidden transition-all duration-700">
              <Image src={`${basePath}/img-0.jpeg`} alt="Shop" fill className="object-cover" />
            </div>

            <div className="text-[11px] md:text-xs tracking-[0.2em] space-y-8 pt-4">
              <div className="flex flex-col gap-2">
                <span className="font-black opacity-30 uppercase text-[9px]">Address</span>
                <span>〒943-0138 新潟県上越市本長者原1</span>

                <span className="cursor-pointer hover:line-through inline-block w-fit">
                  <a
                    href="https://www.google.com/maps/place/37%C2%B005'40.8%22N+138%C2%B016'51.8%22E/@37.08786,138.2673242,15z/data=!4m4!3m3!8m2!3d37.094663!4d138.281052?entry=ttu&g_ep=EgoyMDI2MDEyNy4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                    target="_blank"
                  >
                    Google Map
                  </a>
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-black opacity-30 uppercase text-[9px]">mail</span>
                <span>
                  <a href="mailto:twilight_090913@yahoo.co.jp">twilight_090913@yahoo.co.jp</a>
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-black opacity-30 uppercase text-[9px]">Tel & Fax</span>
                <span>080-3555-4417</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-black opacity-30 uppercase text-[9px]">Open</span>
                <span>12:00 - 21:00</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-black opacity-30 uppercase text-[9px]">Instagram</span>
                <SharedTabLink>
                  <span>@twilight</span>
                </SharedTabLink>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-black opacity-30 uppercase text-[9px]">access</span>
                <span className="inline-flex items-center gap-1">
                  <Square className="text-gray-400 inline" size={12} /> JR北陸新幹線 (東京-上越妙⾼/約2時間) 上越妙⾼駅より⾞で約15分
                </span>
                <span className="inline-flex items-center gap-1">
                  <Square className="text-gray-400 inline" size={12} /> 北陸⾃動⾞道 上越インターチェンジより⾞で約10分
                </span>
                <span className="inline-flex items-center gap-1">
                  <Square className="text-gray-400 inline" size={12} /> 上信越⾃動⾞道 上越⾼⽥インターチェンジより⾞で約15分
                </span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ---  --- */}
      <motion.section {...fadeInUp} id="" className="w-full max-w-[900px] text-center">
        <div className="flex flex-col items-center justify-center gap-4 text-left mb-0 w-full">
          <div className="space-y-8 text-[13px] md:text-sm leading-[2.4] tracking-[0.18em] mb-0 font-medium">
            <p>
              めまぐるしくも平穏で当たり前の⽇常 ⽇々を彩る⼩さな幸せを感じながら明⽇を愛しく思える⼈⽣でありたい
              <br />
              そんな精神性が”twilight”のコンセプト
              <br />
              <br />
              ⼣暮れや夜明け直前の静けさ＝”薄明”の時間を意味する”twilight”。
              <br />
              <br />
              何かを選び、動き出す前のわずかな瞬間。その決断をそっと⽀えるような、毎⽇へ寄り添うモノを提案したいと考えます。
              <br />
              <br />
              豊かさと厳しさを併せ持つ四季折々の気候下で朗らかに慎ましく暮らす⼈々のワードローブの⼀助となれるよう、
              <br />
              私が”twilight”を通して⼈⽣を懸けて発信していきたいのは、
              <br />
              普遍的な魅⼒を持ったブランド編成によるトレンドに左右されないスタイルです。
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] transition-all duration-700">
            <Image src={`${basePath}/map.png`} alt="map" fill priority className="object-contain" />
          </div>
          <div className="space-y-8 text-[13px] md:text-sm leading-[2.4] tracking-[0.18em] mb-0 font-medium">
            <p>
              “twilight”は上越市の中⼼地である⾼⽥エリア周辺の平野部に位置します。
              <br />
              以下に記載した市内の主要陸路からのアクセスに優れた場所でありながら、
              <br />
              ⼟地の270度を⽥園に囲まれた⻑閑なロケーションが建設地です。
              <br />
              ⼣陽と相性の良い⽅⾓に店舗部分を配しています。
              <br />
              <br />
              “店舗兼住宅である特性”と”コンセプト”を尊重すべく、
              <br />
              あえて商業地域への出店は避け、お店は勿論ですが私⾃⾝も
              <br />
              この地にきちんと根差した⽇常を積み重ねていくことが主眼です。
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
