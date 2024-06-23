<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="nav-vue">
    <nav>
      <RouterLink
        id="home"
        to="/">
        最新賽事
      </RouterLink>
      <RouterLink
        id="player-profiles"
        to="/player-profiles">
        球員介紹
      </RouterLink>
      <RouterLink
        id="teams"
        to="/teams">
        球隊介紹
      </RouterLink>
      <RouterLink
        id="games"
        to="/games">
        比賽紀錄
      </RouterLink>
      <RouterLink
        id="player-stats"
        to="/player-stats">
        比賽表現
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
  padding: 1em 0.8em
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
    text-decoration: none
    width: 100%
    word-break: break-all

    &:last-child
      padding-block-end: 40vh

    &:hover
      color: initial
</style>
