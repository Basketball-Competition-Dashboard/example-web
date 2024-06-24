import { createRouter, createWebHistory } from 'vue-router';
import GameView from '@/views/GameView.vue';
import PlayerProfileView from '@/views/PlayerProfileView.vue';
import PlayerStatView from '@/views/PlayerStatView.vue';
import TeamView from '@/views/TeamView.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '最新賽事',
      component: TeamView,
    },
    {
      path: '/player-profiles',
      name: '球員介紹',
      component: PlayerProfileView,
    },
    {
      path: '/teams',
      name: '球隊介紹',
      component: TeamView,
    },
    {
      path: '/games',
      name: '比賽紀錄',
      component: GameView,
    },
    {
      path: '/player-stats',
      name: '比賽表現',
      component: PlayerStatView,
    },
  ],
});
