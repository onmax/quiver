// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-charts',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  mdc: {
    highlight: {
      noApiRoute: false,
    },
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: false,
      routes: [],
    },
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  build: {
    transpile: ['nuxt-charts']
  },

  vite: {
    optimizeDeps: {
      include: ['to-px', 'd3-scale', 'd3-shape', 'd3-array']
    }
  },
})
