import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/Main.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '最新賽事',
      component: Main,
    },
    {
      path: '/player-profiles',
      name: '球員介紹',
      component: Main,
    },
    {
      path: '/teams',
      name: '球隊介紹',
      component: Main,
    },
    {
      path: '/games',
      name: '比賽紀錄',
      component: Main,
    },
    {
      path: '/player-stats',
      name: '比賽表現',
      component: Main,
    },
  ],
});

export default router;
