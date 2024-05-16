<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './views/Header.vue';
import Logo from './components/Logo.vue';
import PageNav from './components/PageNav.vue';
</script>

<template>
  <Header>
    <template #logo><Logo /></template>
    <template #nav><PageNav /></template>
  </Header>
  <section id="content">
    <RouterView />
  </section>
</template>

<style scoped lang="sass">
#app-view
  background: brown
</style>
