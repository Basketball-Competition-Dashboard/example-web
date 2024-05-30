import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/player-profiles',
      name: 'player-profiles',
      component: () => import('../views/Seasons.vue'),
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('../views/Teams.vue'),
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/Games.vue'),
    },
    {
      path: '/player-stats',
      name: 'player-stats',
      component: () => import('../views/Players.vue'),
    },
  ],
});

export default router;
