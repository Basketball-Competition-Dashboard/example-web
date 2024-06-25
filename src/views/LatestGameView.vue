<script setup lang="ts"></script>

<template>
  <div class="latest-game-view-vue">
    <section class="top">
      <h1 class="title">{{ $route.name }}</h1>
    </section>
    <section class="center">
      <div class="game-gallery">
        <div class="game-info">
          <div class="game-date">2021.09.01 Wed.</div>
          <div class="game-team">NYK vs. LAL</div>
        </div>
        <img
          alt="game-arena"
          class="game-arena"
          src="@/assets/game-arena.jpg"
          sizes="1346x860" />
        <img
          alt="game-arena"
          class="game-arena"
          src="@/assets/game-arena.jpg"
          sizes="1346x860" />
        <div class="game-info">
          <div class="game-date">2021.09.02 Thu.</div>
          <div class="game-team">LAC vs. GSW</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="sass">
.latest-game-view-vue
  align-items: center
  display: flex
  flex-direction: column
  height: calc(100vh - 9.7em)
  overflow-y: auto
  overscroll-behavior-y: contain
  width: 100%

.top
  background-color: #ffffff
  left: 0
  padding-block: 2em
  position: sticky
  top: 0
  width: 100%

  .title
    color: #000000
    font-size: 2.5em
    font-weight: 600
    width: 100%
    text-align: center

.center
  align-items: center
  display: flex
  font-size: 2.5em
  flex-direction: column
  height: 100%
  width: 100%

  .game-gallery
    align-items: center
    display: grid
    gap: 1.5em
    grid-template-columns: repeat(2, 1fr)
    grid-template-rows: repeat(auto-fill, 1fr)
    justify-items: flex-start
    padding-block-end: 1.5em
    width: 70%

    & > *
      font-size: 0.9em
      width: 100%
    
    .game-info
      align-items: flex-start
      display: flex
      flex-direction: column
      gap: 0.5em

      .game-date
        font-size: 1em
        font-weight: 500

      .game-team
        font-size: 0.9em
        font-weight: 400
</style>
