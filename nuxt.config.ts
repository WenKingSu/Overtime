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
    '@/assets/style/css/fonts.css',
  ],
  modules: [
    '@primevue/nuxt-module',
    '@unocss/nuxt',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  },
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
  }
})
