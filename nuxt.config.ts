// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  vueQuery: {
    stateKey: 'vue-query-nuxt',
    queryClientOptions: {
      defaultOptions: { queries: { staleTime: 5000 } }, // default
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    '@hebilicious/vue-query-nuxt',
    //...
  ],
});
