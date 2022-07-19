import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import legacy from '@vitejs/plugin-legacy';
import svgLoader from 'vite-svg-loader';
import { createClassNamehash } from './scripts/utils/createClassNameHash';
import { loadEnv } from './scripts/utils/loadEnv';

const root = __dirname;

// https://vitejs.dev/config/
export default defineConfig((ctx) => {
  const { define, envDir, envPrefix } = loadEnv({ mode: ctx.mode, root });

  return {
    envDir,
    envPrefix,
    define,
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
      vueI18n(),
      svgLoader({
        defaultImport: 'url'
      }),
      legacy({
        targets: [
          'defaults',
          'not ie <= 11',
          'chrome 87',
          'safari 13',
          'firefox 78',
          'edge 88'
        ]
      })
    ],
    build: {
      target: ['es2015', 'chrome87', 'safari13', 'firefox78', 'edge88']
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  };
});
