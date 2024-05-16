<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/seasons">Seasons</RouterLink>
    <RouterLink to="/teams">Teams</RouterLink>
    <RouterLink to="/games">Games</RouterLink>
    <RouterLink to="/players">Players</RouterLink>
  </nav>
</template>

<style scoped lang="sass">
nav
  a
    transition: linear 0.1s
    cursor: pointer
    display: inline-block
    padding: 0.5em
    position: relative
    color: brown
    text-align: center
    text-decoration: unset
    &:hover
      color: white
      background-color: brown
</style>
