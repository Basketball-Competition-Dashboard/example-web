<script setup lang="ts">
import Head from '@/components/Head.vue';
</script>

<template>
  <header>
    <section id="logo"><Head /></section>
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
    width: 100%
  #nav
    align-items: center
    display: flex
    justify-content: flex-end
    width: 15%
</style>
