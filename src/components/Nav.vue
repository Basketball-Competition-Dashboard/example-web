<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="nav-vue">
    <nav>
      <RouterLink
        v-for="route in $router.getRoutes()"
        :id="route.path.slice(1) || 'home'"
        :key="route.path"
        :to="route.path">
        {{ route.name }}
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped lang="sass">
nav
  align-items: center
  background-color: #d9d9d9
  display: flex
  flex-direction: column
  font-size: 2.25em
  height: 100vh
  overflow-y: auto
  overscroll-behavior-y: contain
  padding-block: 1em
  padding-inline: 0.75em
  position: relative
  user-select: none
  -webkit-user-select: none
  word-break: break-all
  width: 100%

  a
    color: black
    display: flex
    height: max-content
    padding-block-end: 1em
    position: relative
    text-align: center
    text-decoration: none
    width: auto

    &:last-child
      padding-block-end: 40vh

    &:hover
      color: initial
</style>
