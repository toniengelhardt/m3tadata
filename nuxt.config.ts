import * as fs from 'fs'
import { fileURLToPath } from 'url'
import GlobalPolyFill from '@esbuild-plugins/node-globals-polyfill'

const appTitle = 'Merklin'
const appDescription = 'Open-source EVM explorer made with Vue, Nuxt, and Ethers'
const appUrl = 'https://app.merklin.xyz'

export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      etherscanApiKey: process.env.ETHERSCAN_API_KEY,
      infuraApiKey: process.env.INFURA_API_KEY,
      alchemyApiKey: process.env.ALCHEMY_API_KEY,
      pocketApiKey: process.env.POCKET_API_KEY,
      ankrApiKey: process.env.ANKR_API_KEY,
      jsonRpcUrl: process.env.ETH_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/n5Vj8wE2BHWCtpxqeIZZRJFMVyvifuYv',
      repoUrl: 'https://github.com/toniengelhardt/m3tadata',
      twitterUrl: '',
      discordUrl: '',
    },
  },
  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@nuxtjs/color-mode',
    '@nuxtjs/plausible',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-headlessui',
    'nuxt-icon',
    'nuxt-security',
  ],
  imports: {
    dirs: [
      './stores',
    ],
  },
  experimental: {
    reactivityTransform: true,
  },
  vite: {
    resolve: {
      alias: {
        process: 'process/browser',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib',
        util: 'util',
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        plugins: [
          GlobalPolyFill({
            process: true,
            buffer: true,
          }) as any, // fix weird type error
        ],
      },
    },
  },
  typescript: {
    shim: false,
  },
  css: [
    'assets/css/style.css',
  ],
  pwa: {
    manifest: {
      id: '/?standalone=true',
      name: appTitle,
      short_name: appTitle,
      description: appDescription,
      display: 'standalone',
      orientation: 'any',
      lang: 'en',
      start_url: '/?standalone=true',
      scope: '/',
      categories: ['utilities'],
      theme_color: '#18181b',
      background_color: '#18181b',
    },
    meta: {
      name: appTitle,
      description: appDescription,
      mobileApp: true,
      mobileAppIOS: true,
      lang: 'en',
      favicon: false,
      ogType: 'website',
      ogSiteName: appTitle,
      ogTitle: appTitle,
      ogDescription: appDescription,
      ogUrl: appUrl,
      theme_color: undefined,
    },
    icon: {
      source: 'public/icon.png',
      maskableSource: 'public/icon.png',
      // maskablePadding: 0,
      splash: {
        backgroundColor: '#18181b',
        devices: [],
        targetDir: 'splash',
      },
    },
  },
  colorMode: {
    classSuffix: '',
  },
  plausible: {
    domain: process.env.PLAUSIBLE_DOMAIN || '',
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
        translate: 'no',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', key: 'favicon' },
      ],
    },
  },
  devServer: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT ? +process.env.PORT : 3000,
  },
})
