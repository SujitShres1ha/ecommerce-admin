/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['bucket-next-ecommerce.s3.amazonaws.com']
  }
};

export default nextConfig;
