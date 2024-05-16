<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <header>
    <section id="logo"><slot name="logo"></slot></section>
    <section id="nav"><slot name="nav"></slot></section>
  </header>
</template>

<style scoped lang="sass">
header
  width: 100%
  background-color: orange
  #nav
    display: flex
    align-items: flex-end
    justify-content: flex-end
    width: 100%
</style>
