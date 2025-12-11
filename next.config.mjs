import withPWAInit from "@ducanh2912/next-pwa";

// const withPWA = withPWAInit({
//     dest: "public",
//     cacheOnFrontEndNav: true,
//     aggressiveFrontEndNavCaching: true,
//     reloadOnOnline: true,
//     disable: false,
//     extendDefaultRuntimeCaching: true,
//     workboxOptions: {
//         disableDevLogs: true
//     }
// });

const withPWA = withPWAInit({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    disable: false,
    extendDefaultRuntimeCaching: true,
    workboxOptions: {
        disableDevLogs: true,
        runtimeCaching: [
            {
                // Cache Next.js static assets (CSS/JS chunks)
                urlPattern: /^\/_next\/static\/.*/i,
                handler: "CacheFirst",
                options: {
                    cacheName: "next-static-assets",
                    expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                    },
                },
            },
            {
                // Cache Next.js image optimization API responses
                urlPattern: /^\/_next\/image\?url=.*/i,
                handler: "CacheFirst",
                options: {
                    cacheName: "next-image-cache",
                    expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                    },
                },
            },
            {
                // ✅ This brings back visited page caching
                urlPattern: ({ request }) => request.destination === "document",
                handler: "NetworkFirst",
                options: {
                    cacheName: "page-cache",
                    networkTimeoutSeconds: 3,
                    expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 24 * 60 * 60,
                    },
                },
            },
            {
                // Cache CSS files
                urlPattern: ({ request }) => request.destination === "style",
                handler: "StaleWhileRevalidate",
                options: {
                    cacheName: "css-cache",
                    expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
                    },
                },
            },
            {
                // Cache JS files
                urlPattern: ({ request }) => request.destination === "script",
                handler: "StaleWhileRevalidate",
                options: {
                    cacheName: "js-cache",
                    expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
                    },
                },
            },
            {
                // Cache images
                urlPattern: ({ request }) => request.destination === "image",
                handler: "CacheFirst",
                options: {
                    cacheName: "image-cache",
                    expiration: {
                        maxEntries: 100,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                    },
                },
            },
            {
                // Cache fonts
                urlPattern: ({ request }) => request.destination === "font",
                handler: "CacheFirst",
                options: {
                    cacheName: "font-cache",
                    expiration: {
                        maxEntries: 20,
                        maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
                    },
                },
            },
            {
                // Cache Lottie JSON animations
                urlPattern: ({ url }) => url.pathname.endsWith(".json"),
                handler: "CacheFirst",
                options: {
                    cacheName: "lottie-cache",
                    expiration: {
                        maxEntries: 30,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                    },
                },
            },
        ],
    },
});


const nextConfig = {
    images: {
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

export default withPWA(nextConfig);
