// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  app: {
    head: {
      title: '加班台小工具',
    },
  },
  css: [
    '@/assets/style/css/global.css',
  ],
  modules: [
    '@primevue/nuxt-module',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  primevue: {
    usePrimeVue: true,
    autoImport: true,
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    },
    assetsInclude: ['**/*.ttc'],
    server: {
      proxy: {
        '/youtube-api': {
          target: 'https://www.youtube.com', // YouTube 服务器
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace(/^\/youtube-api/, ''), // 移除前缀
        },
      },
    },
  },
})
