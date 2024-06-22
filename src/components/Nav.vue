<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="nav-vue">
    <nav>
      <RouterLink to="/">最新賽事</RouterLink>
      <RouterLink to="/player-profiles">球員介紹</RouterLink>
      <RouterLink to="/teams">球隊介紹</RouterLink>
      <RouterLink to="/games">比賽紀錄</RouterLink>
      <RouterLink to="/player-stats">比賽表現</RouterLink>
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
  padding: 1em 0.85em
  position: relative
  user-select: none
  -webkit-user-select: none
  width: 100%

  a
    color: black
    display: flex
    height: max-content
    padding-block-end: 1em
    position: relative
    text-decoration: none
    width: max-content

    &:last-child
      margin-block-end: 100%

    &:hover
      color: initial
</style>
