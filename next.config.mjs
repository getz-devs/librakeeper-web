import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
    reactStrictMode: false,
    compiler: {
        // Remove console logs only in production, excluding error logs
        removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
});
