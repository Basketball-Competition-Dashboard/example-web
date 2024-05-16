<script setup lang="ts">
import Header from './views/Header.vue';
</script>

<template>
  <section id="header">
    <Header />
  </section>
  <section id="content">
    <RouterView />
  </section>
</template>

<style scoped lang="sass">
#content
  background: brown
  width: 100%
</style>
