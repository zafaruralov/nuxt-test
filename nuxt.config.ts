import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image"],

  app: {
    head: {
      title: "NuxtMarket - Your One-Stop Shop",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Discover the best products at the best prices. Shop electronics, clothing, home goods and more.",
        },
        { name: "theme-color", content: "#f59e0b" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  css: ["~/assets/css/main.css"],

  image: {
    provider: "ipx",
  },

  routeRules: {
    // SSR routes
    "/": { ssr: true },
    "/products": { ssr: true },
    "/products/**": { ssr: true },
    "/categories/**": { ssr: true },

    // Static routes
    "/about": { static: true },
    "/contact": { static: true },
    "/privacy": { static: true },

    // API routes with cache
    "/api/**": {
      cors: true,
      headers: {
        "cache-control": "s-maxage=60, stale-while-revalidate=30",
      },
    },
  },

  nitro: {
    prerender: {
      routes: ["/", "/products", "/categories"],
    },
  },

  compatibilityDate: "2025-04-06",
});