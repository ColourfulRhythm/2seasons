import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog.html", destination: "/blog", permanent: true },
      {
        source: "/Rubber_Plantation_Manual_Web.html",
        destination: "/blog/rubber-plantation-manual",
        permanent: true,
      },
      {
        source: "/Oil_Palm_Manual_Web.html",
        destination: "/blog/oil-palm-manual",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/blog", destination: "/blog.html" },
      {
        source: "/blog/rubber-plantation-manual",
        destination: "/Rubber_Plantation_Manual_Web.html",
      },
      {
        source: "/blog/oil-palm-manual",
        destination: "/Oil_Palm_Manual_Web.html",
      },
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
