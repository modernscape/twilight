// projects/twilight/next.config.ts
import type {NextConfig} from "next"

const nextConfig: NextConfig = {
  output: "export", // これを追加！
  basePath: process.env.VERCEL ? "/twilight" : "",
  assetPrefix: process.env.VERCEL ? "/twilight" : "",

  // 画像最適化機能をオフにする（GitHub Pagesなどの静的ホストでは必須）
  images: {
    unoptimized: true,
  },

  reactCompiler: true,
}

export default nextConfig
