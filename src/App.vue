<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Nav from '@/components/Nav.vue';
import pingStore from './stores/ping';

const ping = pingStore();

// onMounted(async () => {
//   await ping.ping();
//   console.log(ping.value);
// });
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
  grid-template-columns: minmax(16%, min-content) auto
  grid-template-rows: min-content 100%

  #header
    grid-area: header

  #sidebar
    grid-area: sidebar

  #content
    grid-area: content
</style>
