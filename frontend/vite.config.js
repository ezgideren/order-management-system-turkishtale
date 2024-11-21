import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://order-management-system-turkishtale.onrender.com',
                changeOrigin: true,
                secure: false,
                ws: true
            }
        }
    }
});
