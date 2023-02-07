// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],

  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    jwtAccessLifetime: process.env.JWT_ACCESS_LIFETIME,
    jwtRefreshLifetime: process.env.JWT_REFRESH_LIFETIME,
    nodeEnv: process.env.NODE_ENV,
  },
});
