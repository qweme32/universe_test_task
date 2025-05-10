// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', "@nuxt/icon"],
  fonts: {
    families: [
      {
        name: "Manrope",
        provider: "google"
      }
    ]
  },
  icon: {
    mode: "svg"
  },
  css: ["~/assets/main.scss"],
  runtimeConfig: {
    apiUrl: 'http://backend:4000/'
  }
})