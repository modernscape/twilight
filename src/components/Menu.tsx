"use client"

import {motion, AnimatePresence} from "framer-motion"
import Link from "next/link"
// import {handleJump_} from "../app/utils/scroll"
// import {scrollToSection} from "../app/utils/scrollToSection"

interface MenuProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const lineVariants = {
  closed: (i: number) => ({
    rotate: 0,
    y: i === 1 ? -3 : 3,
    transition: {duration: 0.2},
  }),
  open: (i: number) => ({
    rotate: i === 1 ? 45 : -45,
    y: 0,
    transition: {delay: 0.2, duration: 0.3},
  }),
}

export default function Menu({isOpen, setIsOpen}: MenuProps) {
  const handleJump = (id: string) => {
    const element = document.getElementById(id)
    console.log(id)

    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // スルスル動かす
        block: "start", // 要素の先頭を画面の上に合わせる
      })
    }
  }
  const menuItems = [
    // {name: "Top", href: "/", isExternal: false},
    // {name: "Online Store", href: "#", isExternal: true},
    {name: "Shop", href: "/about", isExternal: false, id: "about"},
    {name: "Location", href: "/about", isExternal: false, id: "selection"},
    {name: "Company", href: "/about", isExternal: false, id: "company"},
  ]
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景オーバーレイ */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-[110]"
          />

          {/* メニューパネル */}
          <motion.div
            initial={{x: "100%"}}
            animate={{x: 0}}
            exit={{x: "100%"}}
            transition={{type: "spring", damping: 25, stiffness: 200}}
            className="fixed top-0 right-0 h-full w-[280px] bg-white z-[120] flex flex-col"
          >
            {/* クローズボタン */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-6 md:p-10 w-full flex flex-col items-center justify-center space-y-2 bg-white"
            >
              <div className="relative w-8 h-4 flex items-center justify-center">
                <motion.div
                  variants={lineVariants}
                  initial="closed"
                  animate="open"
                  custom={1}
                  className="absolute w-8 h-[2.5px] bg-black"
                />
                <motion.div
                  variants={lineVariants}
                  initial="closed"
                  animate="open"
                  custom={2}
                  className="absolute w-8 h-[2.5px] bg-black"
                />
              </div>
            </button>

            {/* ナビゲーション */}
            <nav className="flex flex-col space-y-12 text-right p-10 mt-10">
              {menuItems.map((item) => {
                const className = "text-lg font-black tracking-[0.2em] transition-all uppercase hover:line-through"

                return (
                  <Link
                    key={item.name}
                    href={item.id ? `/about#${item.id}` : item.href} // IDがある場合はハッシュ付きURLにする
                    className={className}
                    onClick={(e) => {
                      const isAboutPage = window.location.pathname === "/about"

                      // 1. もし今 /about ページにいるなら、スムーズスクロールさせる
                      if (isAboutPage && item.id) {
                        e.preventDefault() // 通常の遷移を止める
                        handleJump(item.id)
                      }

                      // 2. メニューを閉じる（共通）
                      setIsOpen(false)
                    }}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
