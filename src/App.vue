<script setup lang="ts">
import RouterView from 'vue-router';
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';
</script>

<template>
  <section id="header">
    <Header />
  </section>
  <section id="main">
    <aside id="sidebar">
      <Nav />
    </aside>
    <div id="content">
      <RouterView />
    </div>
  </section>
</template>

<style scoped lang="sass">
#header
  display: block
  position: sticky
  top: 0
  left: 0
  width: 100%

#main
  background: brown
  width: 100%
  display: flex

#sidebar
  width: 13rem // Adjust this width as necessary
  background-color: #f0f0f0 // Optional: Add a background color for the sidebar
  display: flex
  flex-direction: column
  height: max-content

#content
  width: 80% // Adjust this width as necessary
  display: flex
  flex-direction: column
  align-items: center
  padding: 1em
</style>
