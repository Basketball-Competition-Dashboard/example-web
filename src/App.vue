<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Nav from '@/components/Nav.vue';
</script>

<template>
  <section id="header">
    <Header />
  </section>
  <section id="main">
    <aside id="nav">
      <Nav />
    </aside>
    <article id="content">
      <RouterView />
    </article>
  </section>
</template>

<style scoped lang="sass">
#header
  display: block
  position: relative
  height: auto
  width: 100%

#main
  display: flex
  flex-direction: row
  height: auto
  position: relative
  width: 100%

  #nav
    display: flex
    flex-direction: column
    height: auto
    position: relative
    width: auto

  #content
    align-items: center
    display: flex
    flex-direction: column
    height: auto
    width: 100%
</style>
