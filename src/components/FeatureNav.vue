<script setup lang="ts">
import { RouterLink, type RouteRecordNormalized } from 'vue-router';

function isFeatureRoute(route: RouteRecordNormalized): boolean {
  return route.path.startsWith('/features/');
}
</script>

<template>
  <nav class="feature-nav-vue">
    <RouterLink
      v-for="route in $router.getRoutes().filter(isFeatureRoute)"
      :id="route.path"
      :key="route.path"
      :to="route.path">
      {{ route.name }}
    </RouterLink>
  </nav>
</template>

<style scoped lang="sass">
.feature-nav-vue
  align-items: center
  background-color: #d9d9d9
  display: flex
  flex-direction: column
  font-size: 2.25em
  height: 100%
  padding-block: 1.1em
  padding-inline: 0.8em
  user-select: none
  -webkit-user-select: none
  width: 100%
  overflow-y: auto
  overscroll-behavior-y: contain

  a
    background-color: inherit
    color: black
    display: flex
    height: max-content
    padding-block-end: 1.1em
    text-align: center
    width: max-content
</style>
