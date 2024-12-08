/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**', // Matches all paths on this domain
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

 
};

export default nextConfig;
