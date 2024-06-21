import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/Main.vue';
import type { Game, Team, PlayerProfile, PlayerStat } from '@/generated/web-api';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '最新賽事',
      component: Main,
      meta: {
        tableHeaders: undefined,
      }
    },
    {
      path: '/player-profiles',
      name: '球員介紹',
      component: Main,
      meta: {
        tableHeaders: {
          id: 'ID',
          name: '姓名',
        } as PlayerProfile,
      },
    },
    {
      path: '/teams',
      name: '球隊介紹',
      component: Main,
      meta: {
        tableHeaders: {

        },
      },
    },
    {
      path: '/games',
      name: '比賽紀錄',
      component: Main,
      meta: {
        tableHeaders: {

        },
      },
    },
    {
      path: '/player-stats',
      name: '比賽表現',
      component: Main,
      meta: {
        tableHeaders: {

        },
      },
    },
  ],
});

export default router;
