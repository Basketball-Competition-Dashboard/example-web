<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav>
    <tr>
      <th><RouterLink to="/seasons">Seasons</RouterLink></th>
      <th><RouterLink to="/teams">Teams</RouterLink></th>
      <th><RouterLink to="/games">Games</RouterLink></th>
      <th><RouterLink to="/players">Players</RouterLink></th>
    </tr>
  </nav>
</template>

<style scoped lang="sass">
nav
  tr
    padding-inline: 0.5em
    th
      transition: linear 0.1s
      cursor: pointer
      padding: 0.5em
      color: brown
      &:hover
        color: white
        background-color: brown
    a
      text-decoration: none
      color: unset
</style>
