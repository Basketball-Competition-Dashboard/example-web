<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink to="/">
    <Icon icon="mdi:basketball" />
  </RouterLink>
</template>

<style scoped lang="sass">
svg
  width: 3em
  height: 3em
  color: brown
</style>
