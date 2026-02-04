/** @type {import('next').NextConfig} */
const repo = "MSQ";
const basePath = `/${repo}`;

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: `${basePath}/`,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

module.exports = nextConfig;
