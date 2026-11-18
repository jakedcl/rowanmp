import type { NextConfig } from "next";

const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "0mbng8go";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: `/images/${sanityProjectId}/**`,
      },
    ],
  },
  agentRules: false,
  async headers() {
    const securityHeaders = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
    ];
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/admin", destination: "/studio", permanent: false },
      { source: "/admin/:path*", destination: "/studio/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
