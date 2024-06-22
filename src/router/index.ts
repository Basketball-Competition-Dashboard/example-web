import { createRouter, createWebHistory } from 'vue-router';
import GameView from '@/views/GameView.vue';
import TeamView from '@/views/TeamView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '最新賽事',
      component: TeamView,
      meta: {},
    },
    {
      path: '/games',
      component: GameView,
    },
    {
      path: '/teams',
      component: TeamView,
    },
    {
      path: '/player-profiles',
      name: '球員介紹',
      component: TeamView,
      meta: {
        tableHeaders: {
          name: 'PLAYER',
          team_name: 'TEAM',
          position: 'POSITION',
          birthdate: 'BIRTHDATE',
          height: 'HEIGHT',
          weight: 'WEIGHT',
          country: 'COUNTRY',
        },
        tableFieldsNew: [
          'name',
          'team_name',
          'position',
          'birthdate',
          'height',
          'weight',
          'country',
        ],
        tableFieldsPatch: [
          'name',
          'team_name',
          'position',
          'birthdate',
          'height',
          'weight',
          'country',
        ],
      },
    },
    {
      path: '/player-stats',
      name: '比賽表現',
      component: TeamView,
      meta: {
        tableHeaders: {
          player: 'PLAYER',
          game: 'GAME',
          assist: 'ASSIST',
          hit: 'HIT',
          steal: 'STEAL',
          rebound: 'REBOUND',
          free_throw: 'FREE THROW',
          score: 'SCORE',
        },
        tableFieldsNew: [
          'player',
          'game',
          'assist',
          'hit',
          'steal',
          'rebound',
          'free_throw',
          'score',
        ],
        tableFieldsPatch: [
          'assist',
          'hit',
          'steal',
          'rebound',
          'free_throw',
          'score',
        ],
      },
    },
  ],
});

export default router;
