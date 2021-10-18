module.exports = {
  ssr: false,
  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  head: {
    title: 'beDID Web Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo-bedid.svg' }
    ]
  },

  css: [
    '@/assets/styles/main.css'
  ],

  plugins: [
    '@/plugins/base-components',
    '@/plugins/axios',
    '@/plugins/api',
    '@/plugins/modal',
    '@/plugins/notification',
    '@/plugins/select',
    '@/plugins/toggle',
    '@/plugins/vue-highlightjs',
    '@/plugins/vue-table',
    '@/plugins/model',
    '@/plugins/vue-tel-input',
    '@/plugins/province',
    '@/plugins/district',
    '@/plugins/subdistrict',
    '@/plugins/zip',
    '@/plugins/vue-color',
  ],

  loading: false,

  components: false,

  telemetry: false,

  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: process.env.API || `https://admin-dev.beid.tech`,
    proxy: true,
  },

  proxy: [
    [
      "/api",
      {
        target: process.env.API || `https://admin-dev.beid.tech`,
        pathRewrite: { "^/api": "/api" },
        changeOrigin: true,
      },
    ],
  ],

  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ],
      compact: true
    }
  }
}
