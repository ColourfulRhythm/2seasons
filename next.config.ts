import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/join", destination: "/join.html" },
      { source: "/explore", destination: "/explore.html" },
      { source: "/villas", destination: "/villas.html" },
      { source: "/wellness", destination: "/wellness.html" },
      { source: "/hyggetown", destination: "/hyggetown.html" },
      { source: "/50plots", destination: "/50plots.html" },
      { source: "/100plots", destination: "/50plots.html" },
      { source: "/paymentplan", destination: "/paymentplan.html" },
      { source: "/partners", destination: "/partners.html" },
      { source: "/privacy", destination: "/privacy.html" },
      { source: "/tucks", destination: "/tucks.html" },
      { source: "/hiddenleafvillage", destination: "/hiddenleafvillage.html" },
      { source: "/2saffiliate", destination: "/2saffiliate/index.html" },
      { source: "/membership", destination: "/membership/index.html" },
    ];
  },
};

export default nextConfig;
