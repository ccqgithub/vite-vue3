import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { createClassNamehash } from './scripts/utils/createClassNameHash';
import { getEnvs } from './scripts/utils/getEnvs';

const root = __dirname;

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    ...getEnvs(),
    __VUE_I18N_LEGACY_API__: JSON.stringify('false'),
    __VUE_I18N_FULL_INSTALL__: JSON.stringify('false'),
    __INTLIFY_PROD_DEVTOOLS__: JSON.stringify('false')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      '~@': path.resolve(__dirname, '../src/'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
    }
  },
  css: {
    modules: {
      generateScopedName: function (name, filename, css) {
        return createClassNamehash({
          root,
          name,
          filename,
          css,
          prefix: 't'
        });
      }
    }
  },
  plugins: [vue(), vueI18n()]
});
