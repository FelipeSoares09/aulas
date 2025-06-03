import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["files.stripe.com"], // Adiciona o domínio diretamente
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
        port: "",
        pathname: "/**", // Permite qualquer caminho
      },
    ],
  },
};

export default nextConfig;
