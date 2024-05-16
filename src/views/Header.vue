<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import PageNav from '@/components/PageNav.vue';
</script>

<template>
  <header>
    <section id="logo"><Logo /></section>
    <section id="nav"><PageNav /></section>
  </header>
</template>

<style scoped lang="sass">
header
  background-color: orange
  display: flex
  padding-block-end: 0.25em
  width: 100%
  #logo
    height: max-content
    padding: 0.25em
    width: max-content
  #nav
    align-items: flex-start
    display: flex
    justify-content: flex-end
    width: 100%
</style>
