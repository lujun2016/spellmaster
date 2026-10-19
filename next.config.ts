import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverExternalPackages: ["bcryptjs", "xlsx", "docx"],
}

export default nextConfig
