import { createRouter, createWebHistory } from 'vue-router';
import GameView from '@/views/GameView.vue';
import PlayerProfile from '@/views/PlayerProfile.vue';
import PlayerStat from '@/views/PlayerStat.vue';
import TeamView from '@/views/TeamView.vue';
import Login from '@/views/Login.vue';

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
      component: PlayerProfile,
    },
    {
      path: '/player-stats',
      component: PlayerStat,
    },
    {
      path: '/teams',
      component: TeamView,
    },
    {
      path: '/login',
      component: Login,
    },
  ],
});

export default router;
