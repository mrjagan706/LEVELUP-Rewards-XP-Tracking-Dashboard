import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// base '/' so assets load from any route (incl. /Lvl-Dashboard); vercel.json rewrites the route to index.html
export default defineConfig({ plugins: [react()], base: '/' });
