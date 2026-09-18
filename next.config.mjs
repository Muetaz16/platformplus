/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
};

export default nextConfig;
