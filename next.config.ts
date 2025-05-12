import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fwaw7h413ibzbblr.public.blob.vercel-storage.com'],
  },
  async redirects() {
    return [
      {
        source: "/explore",
        destination: "/",
        permanent: false,
      },
    ]
  },
}

export default nextConfig