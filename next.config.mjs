import withPWA from "next-pwa";

// Configure PWA

const pwaConfig = {
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  sw: "/sw.js",
  runtimeCaching: [
    {
      urlPattern: "/",
      handler: "NetworkFirst",
      options: {
        cacheName: "home-page-cache",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 60 * 60,
        },
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
  ],
};

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "via.placeholder.com",
      "example.com",
      "sitev2.arabcodeacademy.com",
    ],
  },
};

export default withPWA(pwaConfig)(nextConfig);
