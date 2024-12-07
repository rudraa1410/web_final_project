/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'], // TMDB image domain
  },


  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
