/** @type {import('next').NextConfig} */
const API_PORT = `8090`

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8090',
                pathname: '/api/files/**',
            },
        ],
    },
    env: {
        API_PORT,
        API_BASE_URL: `http://127.0.0.1:${API_PORT}`,
        API_FILES_URL: `http://127.0.0.1:${API_PORT}/api/files`,
        API_PRODUCTS_COLLECTION_URL: `http://127.0.0.1:${API_PORT}/api/collections/products/records`
    },
};

export default nextConfig;
