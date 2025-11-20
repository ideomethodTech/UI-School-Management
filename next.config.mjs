/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**', // This allows any path on that hostname
      },
    ],
  },

  // This was part of the incoming change
  reactCompiler: true,
};

export default nextConfig;
