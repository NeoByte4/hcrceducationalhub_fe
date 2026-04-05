const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hcrceducationhub-cms.onrender.com",
        pathname: "/**",
      },
    ],

    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === "development",
  },
};

module.exports = nextConfig;
