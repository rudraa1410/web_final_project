/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**', // Matches all paths on this domain
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

 
};

export default nextConfig;
