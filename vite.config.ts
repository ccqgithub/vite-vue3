import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { visualizer } from 'rollup-plugin-visualizer';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import circularDependency from 'vite-plugin-circullar-dependency';
import ElementPlus from 'unplugin-element-plus/vite';
import legacy from 'vite-plugin-legacy-extends';
import svgLoader from 'vite-svg-loader';
import { createClassNamehash } from './scripts/utils/createClassNameHash';
import { loadEnv } from './scripts/utils/loadEnv';

const root = __dirname;

// https://vitejs.dev/config/
export default defineConfig((ctx) => {
  const { define, envDir, env, envPrefix } = loadEnv({ mode: ctx.mode, root });

  return {
    envDir,
    envPrefix,
    define: {
      ...define,
      __VUE_PROD_DEVTOOLS__: env['process.env.NODE_ENV'] === 'development'
    },
    base: env.VITE_PUBLIC_URL,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        '~@': path.resolve(__dirname, './src/'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
      }
    },
    server: {
      host: 'localhost'
    },
    css: {
      modules: {
        generateScopedName: function (name, filename, css) {
          return createClassNamehash({
            root,
            name,
            filename,
            css,
            prefix: 'p'
          });
        }
      }
    },
    plugins: [
      vue(),
      basicSsl(),
      svgLoader({
        defaultImport: 'url'
      }),
      vueI18n({
        include: path.resolve(__dirname, './src/i18n/locales/**')
      }),
      ElementPlus(),
      legacy({
        targets: ['chrome 87', 'safari 13', 'firefox 78', 'edge 88'],
        modernPolyfills: true,
        modernTargets: {
          browsers: [
            // 'defaults',
            'chrome 87',
            'safari 13',
            'firefox 78',
            'edge 88'
          ]
        }
      }),
      visualizer() as any,
      circularDependency({
        failOnError: true,
        exclude: /node_modules\//
      }),
      chunkSplitPlugin({
        strategy: 'default',
        customSplitting: {
          'vue-vendor': [
            /node_modules\/(@vue|vue|vue-router|pinia|pinia-di|vue-i18n|@intlify)\//
          ],
          'luxon-vendor': [/node_modules\/(luxon)\//],
          vendor: [/node_modules\//]
        }
      })
    ],
    build: {
      target: ['es2015', 'chrome87', 'safari13', 'firefox78', 'edge88'],
      minify: 'terser',
      terserOptions: {
        format: {
          comments: false
        }
      }
    },
    rollupOptions: {
      maxParallelFileOps: 5,
      output: {
        sourcemap: false
      },
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  };
});
