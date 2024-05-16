<template>
  <header>
    <section id="logo"><slot name="logo"></slot></section>
    <section id="nav"><slot name="nav"></slot></section>
  </header>
</template>

<style scoped lang="sass">
header
  background-color: orange
  display: flex
  width: 100%
  #logo
    align-items: center
    display: flex
    justify-content: flex-start
    padding: 0.25em
    width: max-content
  #nav
    align-items: flex-start
    display: flex
    justify-content: flex-end
    padding-inline: 0.5em
    width: 100%
</style>
