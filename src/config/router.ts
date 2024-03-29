import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { loadLocaleMessages, i18n, isLangFromPath } from '@/i18n';
import { joinUrl } from '@/utils';
import { baseUrl } from './util';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'BasicPage',
    component: () => import('@/pages/BasicPage/index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/Home/index.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/pages/About/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: import('@/pages/404/index.vue')
  }
];

const base = isLangFromPath.value ? `/${i18n.global.locale.value}/` : '/';
const router = createRouter({
  history: createWebHistory(joinUrl(baseUrl, base)),
  routes
});

router.beforeEach(async (to, from, next) => {
  await loadLocaleMessages();
  return next();
});

router.afterEach(async () => {
  //
});

export const getCurrentRoute = () => {
  return router.currentRoute;
};

export { router };
