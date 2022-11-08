import { createApp, onMounted, h } from 'vue';
import { createPinia } from 'pinia';
import { useProvideStores } from 'pinia-di';
import '@/styles/base.scss';
import { i18n } from '@/i18n';
import { router } from '@/config/router';
import { App } from '@/components';
import { AppStore, setGlobakStore } from '@/store';

const app = createApp({
  setup() {
    const { getStore } = useProvideStores({
      stores: [AppStore]
    });
    const appStore = getStore(AppStore);
    setGlobakStore(appStore);

    onMounted(() => {
      appStore.init();
    });

    return () => {
      return h(App);
    };
  }
});

app.use(createPinia());
app.use(i18n);
app.use(router);
app.mount('#app');
