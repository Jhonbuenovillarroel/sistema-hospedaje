/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      urlImports: ["https://pocpaymentserve.s3.amazonaws.com"],
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "res.cloudinary.com",
         },
      ],
   },
};

module.exports = nextConfig;
