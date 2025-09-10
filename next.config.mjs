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
    // async headers() {
    //     return [
    //         {
    //             source: '/:path*', // match all routes and assets
    //             headers: [
    //                 { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
    //                 { key: 'Pragma', value: 'no-cache' },
    //                 { key: 'Expires', value: '0' },
    //             ],
    //         },
    //     ];
    // },
    async headers() {
        return [
            // HTML pages & API routes
            {
                source: '/:path*',
                headers: [
                    // Disable Vercel CDN cache
                    { key: 'Vercel-CDN-Cache-Control', value: 'no-store' },
                ],
            },
            // Next.js build assets (_next/static/*)
            {
                source: '/_next/static/:path*',
                headers: [
                    { key: 'Vercel-CDN-Cache-Control', value: 'no-store' },
                ],
            },
            // Public folder assets (images, favicon, etc.)
            {
                source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|css|js|woff2|ttf|lottie)',
                headers: [
                    { key: 'Vercel-CDN-Cache-Control', value: 'no-store' },
                ],
            },
        ];
    },


};

export default nextConfig;
