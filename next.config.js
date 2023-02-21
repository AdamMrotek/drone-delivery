/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig = {
  experimental: {
    appDir: true,
  },
  pwa: {
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
};
// const pwaConfig = withPWA(nextConfig);
// delete nextConfig.pwa;
// module.exports = nextConfig;

module.exports = withPWA(nextConfig);
