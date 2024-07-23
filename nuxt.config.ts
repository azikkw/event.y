// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/image"],
  app: {
    head: {
      title: "event.y",
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          name: 'description',
          content: 'event.y is a sleek web app that helps you create events, also discover and explore events near you. '
        }
      ]
    }
  },
  runtimeConfig: {
    ticketMasterKey: process.env.TICKETMASTER_API_KEY,
  },
})