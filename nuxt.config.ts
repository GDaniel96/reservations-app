// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Reservations app",
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        },
      ],
    },
  },

  css: ["./assets/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@samk-dev/nuxt-vcalendar"],
  devtools: { enabled: true },
  pages: true,
  ssr: false,
  plugins: ["./plugins/veevalidate-rules"],
  runtimeConfig: {
    public: {
      API_KEY: process.env.NUXT_API_KEY,
      AUTH_DOMAIN: process.env.NUXT_AUTH_DOMAIN,
      PROJECT_ID: process.env.NUXT_PROJECT_ID,
      STORAGE_BUCKET: process.env.NUXT_STORAGE_BUCKET,
      MESSAGE_SENDER_IT: process.env.NUXT_MESSAGE_SENDER_ID,
      APP_ID: process.env.NUXT_APP_ID,
    },
  },
});
