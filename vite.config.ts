import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [react()],
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
                rewrite: (path) => path.replace(new RegExp(`^${env.VITE_GLOB_API_URL.replace(/\//g, '\\/')}`), ''),
              }
            }
        }
    }
});
