/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['tailwindui.com', 'images.unsplash.com', 'api.escuelajs.co', 'api.lorem.space', 'custom.url', 'ui-avatars.com'],
    },
};

module.exports = nextConfig;
