<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useHead } from '@unhead/vue';
import Header from '@/components/Header.vue';
import FeatureNav from '@/components/FeatureNav.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

useHead({
  title: () => `${String(route.name)} - 籃球戰情室 BCD`,
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
    <section id="header">
      <Header />
    </section>
    <section id="body">
      <aside id="sidebar">
        <FeatureNav />
      </aside>
      <article id="content">
        <RouterView />
      </article>
    </section>
  </div>
</template>

<style scoped lang="sass">
.app-vue
  align-items: center
  display: flex
  flex-direction: column
  height: 100%
  width: 100%

  #header
    height: 9.7em
    width: 100%

  #body
    display: flex
    height: calc(100vh - 9em)
    width: 100%

    #sidebar
      height: 100%
      width: max-content

    #content
      height: max-content
      width: 100%
</style>
