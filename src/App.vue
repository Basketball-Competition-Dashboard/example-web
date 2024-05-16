<script setup lang="ts">
import Header from './views/Header.vue';
</script>

<template>
  <section id="header">
    <Header />
  </section>
  <section id="main">
    <RouterView />
  </section>
</template>

<style scoped lang="sass">
#header
  display: block
  position: sticky
  top: 0
  left: 0
  width: 100%
#main
  background: brown
  width: 100%
</style>
