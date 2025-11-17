/** @type {import('next').NextConfig} */
const nextConfig = {
  // Property from your (Current) change
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

  // Property from Vedang's (Incoming) change
  reactCompiler: true,
};

export default nextConfig;