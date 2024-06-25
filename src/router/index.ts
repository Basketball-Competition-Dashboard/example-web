import { createRouter, createWebHistory } from 'vue-router';
import GameView from '@/views/GameView.vue';
import PlayerProfileView from '@/views/PlayerProfileView.vue';
import PlayerStatView from '@/views/PlayerStatView.vue';
import TeamView from '@/views/TeamView.vue';
import LoginPage from '@/views/LoginPage.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/features/games/latest',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/features/games/latest',
    },
    {
      path: '/features/games/latest',
      name: '最新賽事',
      component: GameView,
    },
    {
      path: '/features/player-profiles',
      name: '球員介紹',
      component: PlayerProfileView,
    },
    {
      path: '/features/teams',
      name: '球隊介紹',
      component: TeamView,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/features/player-stats',
      name: '比賽表現',
      component: PlayerStatView,
    },
  ],
});
