<script setup lang="ts">
import Table from '@/components/Table.vue';

</script>

<template>
  <div class="main-vue">
    <h1 id="title">{{ $route.name }}</h1>
  </div>
  <Table />
</template>

<style scoped lang="sass">
#title
  color: #000000
  font-size: 2.5em
  font-weight: 600
  padding-block: 0.85em
  text-align: center
</style>
