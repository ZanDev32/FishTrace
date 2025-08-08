import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mkcert(),
    // Enable PWA only in production to avoid SW caching issues during dev
    ...(mode === 'production'
      ? [VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.ico', 'pwa-64x64.png', 'pwa-192x192.png', 'pwa-512x512.png'],
          manifest: {
            name: 'Gemastik PWA',
            short_name: 'GemastikPWA',
            description: 'A Progressive Web App built with React, Supabase, and Tailwind CSS',
            theme_color: '#3b82f6',
            background_color: '#ffffff',
            display: 'standalone',
            orientation: 'portrait-primary',
            scope: '/',
            start_url: '/',
            icons: [
              { src: '/pwa-64x64.png', sizes: '64x64', type: 'image/png' },
              { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
              { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
              { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
            ]
          },
          workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg}'] },
        })]
      : [])
  ],
  server: {
    host: true,
    https: true,
    port: 3000,
    strictPort: true,
    open: false,
  },
}))
