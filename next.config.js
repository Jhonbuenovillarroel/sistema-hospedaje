/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      urlImports: ["https://pocpaymentserve.s3.amazonaws.com"],
   },
};

module.exports = nextConfig;
