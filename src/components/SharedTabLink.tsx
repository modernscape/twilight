"use client"

import React from "react"

interface SharedTabLinkProps {
  href?: string
  children: React.ReactNode
  className?: string
  tabName?: string // どの窓で開くか（デフォルトは sns_window）
  onClick?: () => void // メニューを閉じる等の追加処理用
}

// SharedTabLink.tsx

// SharedTabLink.tsx

export default function SharedTabLink({
  href = "https://www.instagram.com/tw_official/",
  children,
  className = "",
  tabName = "twilight_sns_window",
  onClick,
}: SharedTabLinkProps) {
  const handleOpen = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. 念のため JS での制御も試みる
    // ブラウザによっては onClick 内の window.open を優先します
    window.open(href, tabName)

    // 2. 親の onClick（メニューを閉じるなど）を実行
    if (onClick) onClick()
  }

  return (
    <a
      href={href}
      target={tabName} // JSがブロックされても HTML 属性として名前を指定しておく
      rel="noopener" // noreferrer はあえて外す（窓の名前の共有を助けるため）
      onClick={handleOpen}
      className={className}
    >
      {children}
    </a>
  )
}
