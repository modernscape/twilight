/** @type {import('next').NextConfig} */
// const isProd = process.env.NODE_ENV === "production"

const nextConfig = {
  output: "export",
  // GitHub Actions でビルドされる時だけリポジトリ名をパスに含める
  // basePath: isProd ? "/twilight" : "",
  basePath: process.env.GITHUB_REPOSITORY && !process.env.IS_CUSTOM_DOMAIN ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}` : "",
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
