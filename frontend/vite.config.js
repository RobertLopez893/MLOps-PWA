import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // Esto nos permite probar la PWA mientras programamos
      },
      manifest: {
        name: 'Plataforma MLOps Distribuida',
        short_name: 'MLOps PaaS',
        description: 'Orquestación de Machine Learning orientada a Servicios',
        theme_color: '#0d6efd',
        background_color: '#f8f9fa',
        display: 'standalone', // Esto hace que parezca una app nativa, ocultando la barra de URL
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/2103/2103533.png', // Un ícono temporal de IA
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
