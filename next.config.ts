import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // output: 'export', // This is the magic line for static export
  // images: {
  //   unoptimized: true, // Required for static export as Next.js image optimization needs a server
  // },
};

export default nextConfig;
