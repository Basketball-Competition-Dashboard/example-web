<script setup lang="ts">
import { onMounted } from 'vue';
import Login from '@/components/Login.vue';

import {
  getGames,
  patchGamesByIdTeamsByTeamId,
  postGame,
} from '@/generated/web-api';
</script>

<template>
  <div id="team-view-vue">
    <Login />
  </div>
</template>
