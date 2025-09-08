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
};

export default nextConfig;
