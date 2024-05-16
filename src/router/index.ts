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
      path: '/seasons',
      name: 'seasons',
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
      path: '/players',
      name: 'players',
      component: () => import('../views/Players.vue'),
    },
  ],
});

export default router;
