import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'cert/localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'cert/localhost.pem')),
      },
      proxy: {
        '^/api/': {
          target: 'https://localhost:7117',
          secure: false,
          changeOrigin: true,
        }
      },
      port: 50623,
    }
  };
});
