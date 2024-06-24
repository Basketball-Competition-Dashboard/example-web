<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Nav from '@/components/Nav.vue';
</script>

<template>
  <div class="app-vue">
    <div id="grid">
      <section id="header">
        <Header />
      </section>
      <aside id="sidebar">
        <Nav />
      </aside>
      <article id="content">
        <RouterView />
      </article>
    </div>
  </div>
</template>

<style scoped lang="sass">
#grid
  display: grid
  grid-template-areas: "header header" "sidebar content"
  grid-template-columns: minmax(15%, min-content) auto
  grid-template-rows: min-content 100%

  #header
    grid-area: header

  #sidebar
    grid-area: sidebar

  #content
    grid-area: content
</style>
