<script setup lang="ts">
import Table from '@/components/Table.vue';
</script>

<template>
  <div class="main-vue">
    <h1 id="title">{{ $route.name }}</h1>
    <section id="center">
      <Table
        id="table"
        :headers="{
          id: 'ID',
          name: 'NAME',
          email: 'EMAIL',
        }"
        :records="[
          {
            id: 1,
            name: 'John Doe',
            email: 'gg@gmail.com',
          },
          {
            id: 2,
            name: 'Jane Doe',
            email: 'aaa@gmail.com',
          },
          {
            id: 3,
            name: 'John Smith',
            email: '?@gmail.com',
          },
          {
            id: 4,
            name: 'Jane Smith',
            email: 'sddssd@gmail.com',
          },
        ]"
        :deletable="true"
        :editable="true" />
    </section>
  </div>
</template>

<style scoped lang="sass">
#title
  color: #000000
  font-size: 2.5em
  font-weight: 600
  padding-block-start: 1em
  text-align: center

#center
  display: flex
  flex-direction: column
  align-items: center
  width: 100%

  #table
    width: 94%
</style>
