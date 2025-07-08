// next.config.mjs
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import("next").NextConfig} */
const coreconfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ufs.sh",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
  return [
    {
      source: "/relay-EbSN/:path*",
      destination: "https://us.i.posthog.com/:path*",
    },
    {
      source: "/relay-EbSN/static/:path*",
      destination: "https://us-assets.i.posthog.com/static/:path*",
    },
    {
      source: "/relay-EbSN/flags",
      destination: "https://us.i.posthog.com/flags",
    },
  ];
}
};

const sentryOptions = {
  org: "kle-6h",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
};

const config = withSentryConfig(coreconfig, sentryOptions);

export default config;