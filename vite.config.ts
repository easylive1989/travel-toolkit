import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/travel-toolkit/',
  plugins: [
    react(),
    VitePWA({
       registerType: 'autoUpdate',
       manifest: {
         name: "旅遊瑞士刀",
         short_name: "旅遊瑞士刀",
         description: "整合多種實用小工具的旅遊好幫手：匯率換算、小費試算、度量衡轉換、簽證資訊與各國實用短語。",
         theme_color: "#ffffff",
         icons: [
           {
             src: "/icon-192x192.png",
             sizes: "192x192",
             type: "image/png"
           },
           {
             src: "/icon-512x512.png",
             sizes: "512x512",
             type: "image/png"
           }
         ]
       }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
