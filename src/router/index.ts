import { createRouter, createWebHistory } from 'vue-router';
import GameView from '@/views/GameView.vue';
import PlayerProfileView from '@/views/PlayerProfileView.vue';
import PlayerStatView from '@/views/PlayerStatView.vue';
import TeamView from '@/views/TeamView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '最新賽事',
      component: TeamView,
    },
    {
      path: '/games',
      component: GameView,
    },
    {
      path: '/player-profiles',
      component: PlayerProfileView,
    },
    {
      path: '/player-stats',
      component: PlayerStatView,
    },
    {
      path: '/teams',
      component: TeamView,
    },
  ],
});

export default router;
