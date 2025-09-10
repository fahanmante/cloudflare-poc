/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["shift-boolean-dev.s3.ap-south-1.amazonaws.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "shift-boolean-dev.s3.ap-south-1.amazonaws.com",
                port: "",
                // hostname: `${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com`,
                pathname: "/**",
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*', // match all routes and assets
                headers: [
                    { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
                    { key: 'Pragma', value: 'no-cache' },
                    { key: 'Expires', value: '0' },
                ],
            },
        ];
    },

};

export default nextConfig;
