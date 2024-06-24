<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useHead } from '@unhead/vue';
import Header from '@/components/Header.vue';
import Nav from '@/components/Nav.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

useHead({
  title: () =>
    `${String(route.name)} - 籃球戰情室 BCD`,
  meta: [
    {
      name: 'description',
      content:
        '籃球戰情室 Basketball Competition Dashboard - ' +
        '提供完整的比賽數據分析 - ' +
        '幫助您追蹤分析實時數據 - ' +
        'Get instant access to in-depth game analysis. ' +
        'Explore our data-driven platform today and discover our competition dashboard. ',
    },
  ],
});
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
