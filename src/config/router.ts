import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

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
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: import('@/pages/404/index.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export { router };
