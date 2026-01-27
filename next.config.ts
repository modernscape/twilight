/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"

const nextConfig = {
  output: "export",
  // GitHub Actions でビルドされる時だけリポジトリ名をパスに含める
  basePath: isProd ? "/twilight" : "",
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
