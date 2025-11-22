/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Enable static export for Vercel
  trailingSlash: true,
}

module.exports = nextConfig

