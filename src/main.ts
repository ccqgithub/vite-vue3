import { createApp } from 'vue';
import '@/styles/base.scss';
import { App } from '@/components';
import { router } from '@/config';

const app = createApp(App);
app.use(router);
app.mount('#app');
