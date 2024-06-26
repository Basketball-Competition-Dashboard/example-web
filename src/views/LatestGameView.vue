<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getGames, type Game } from '@/generated/web-api';
import { Alert } from '@/functions/alert';

const latestGames = ref<Game[] | undefined>();
const latestGameInfos = computed(() => {
  return (
    latestGames.value?.map(({ date, home_abbr, away_abbr }) => {
      const [year, month, day] = date.split('-');
      const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
        new Date(date).getDay()
      ];
      return {
        date: `${year}.${month}.${day} ${week}.`,
        team: {
          home: home_abbr,
          away: away_abbr,
          text: `${home_abbr} vs. ${away_abbr}`,
        },
      };
    }) ?? []
  );
});

onMounted(async () => {
  try {
    latestGames.value = await getGames({
      pageLength: 10,
      pageOffset: 0,
      sortField: 'date',
      sortOrder: 'descending',
    });
  } catch (error) {
    Alert.showFailure('Read', error);
  }
});
</script>

<template>
  <div class="latest-game-view-vue">
    <section class="top">
      <h1 class="title">{{ $route.name }}</h1>
    </section>
    <section class="center">
      <div class="game-news">
        <template
          v-for="(gameInfo, index) of latestGameInfos"
          :key="index"
          :id="index">
          <div
            class="game-info"
            :style="{ order: (index << 1) + (index & 1) }">
            <span class="game-date">{{ gameInfo.date }}</span>
            <span class="game-team">{{ gameInfo.team.text }}</span>
          </div>
          <div
            class="game-arena"
            :style="{ order: (index << 1) + ((index & 1) ^ 1) }">
            <img
              alt="game-arena-background"
              class="background"
              src="@/assets/game-arena-background.jpg"
              sizes="1346x860" />
            <img
              alt="game-arena-home-team-logo"
              class="home team-logo"
              :src="`/vendors/sportslogos.net/${gameInfo.team.home}.png`" />
            <img
              alt="game-arena-away-team-logo"
              class="away team-logo"
              :src="`/vendors/sportslogos.net/${gameInfo.team.away}.png`" />
          </div>
        </template>
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
  z-index: 2

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

  .game-news
    align-items: center
    display: grid
    gap: 1.5em
    grid-template-columns: repeat(2, 1fr)
    grid-template-rows: repeat(auto-fill, 1fr)
    justify-items: flex-start
    padding-block-end: 1.5em
    width: 70%

    & > *, .game-arena .background
      width: 100%

    .game-arena
      display: flex

    .game-info
      align-items: flex-start
      display: flex
      flex-direction: column
      gap: 0.5em

      .game-date
        font-size: 0.9em
        font-weight: 500

      .game-team
        font-size: 0.8em
        font-weight: 400

    .game-arena
      position: relative

      .background
        position: relative
        z-index: 0
        filter: brightness(1.2) contrast(1.2) opacity(0.7)

      .team-logo
        border-radius: 25%
        bottom: 0
        margin-block: auto
        position: absolute
        top: 0
        width: 35%
        z-index: 1

        &.home
          left: 5%

        &.away
          right: 5%
</style>
