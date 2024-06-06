import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [
            react(),
            createHtmlPlugin({
                inject: {
                    data: {
                        title: 'NFTHook',
                        description: 'Empowering Every Transaction: NFTs for All on Layer 2',
                    },
                },
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            proxy: {
                [env.VITE_GLOB_API_URL]: {
                    target: env.VITE_PROXY_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(new RegExp(`^${env.VITE_GLOB_API_URL.replace(/\//g, "\\/")}`), ""),
                },
            },
        },
    };
});
