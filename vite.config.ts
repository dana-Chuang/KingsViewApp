import { fileURLToPath, URL } from 'node:url'

import { defineConfig, ProxyOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import dns from 'node:dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log(
              'Sending Request to the Target:',
              req.method,
              options.target + proxyReq.path
            )
          })

          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Receiving Response from the Target:', req.method, options.target + req.url)
          })

          proxy.on('error', (err, req, res) => {
            console.log('Error Occurred:', err)
          })
        }
      }
    }
  }
})
