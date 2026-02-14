/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nxnukzawitjgnropmmgh.supabase.co",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination: "https://stag.swappr.com.ng/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
