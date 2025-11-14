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
};
export default nextConfig;
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
