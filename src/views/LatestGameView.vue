<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getGames, type Game } from '@/generated/web-api';
import { Alert } from '@/functions/alert';
import ViewTitle from '@/components/ViewTitle.vue';

const TEAMTYPE_ENUMS = ['home', 'away'] as const;
const PLAYLIST_ID = 'PL7B_aulXoMBN03877ABcI8eYG5JsmCDjC';
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
      pageLength: 9,
      pageOffset: 0,
      sortField: 'date',
      sortOrder: 'descending',
    });
  } catch (error) {
    Alert.showFailure('Read', error);
  }
});

function getOrderPairFromIndex(index: number): [number, number] {
  const firstOrder = (index << 1) | (index & 1);
  return [firstOrder, firstOrder ^ 1];
}
</script>

<template>
  <div class="latest-game-view-vue">
    <section class="top">
      <ViewTitle />
    </section>
    <section class="bottom">
      <div class="game-news">
        <template
          v-for="(gameInfo, index) of latestGameInfos"
          :key="index"
          :id="index">
          <div
            class="game-info"
            :style="{ order: getOrderPairFromIndex(index)[0] }">
            <span class="game-desc-main">{{ gameInfo.date }}</span>
            <span class="game-desc-sub">{{ gameInfo.team.text }}</span>
          </div>
          <div
            class="game-arena"
            :style="{ order: getOrderPairFromIndex(index)[1] }">
            <img
              alt="game-arena-background"
              class="background"
              src="@/assets/game-arena-background.jpg"
              sizes="1346x860" />
            <img
              v-for="teamType in TEAMTYPE_ENUMS"
              :alt="`game-arena-${teamType}-team-logo`"
              :class="`${teamType} team-logo`"
              :src="`/vendors/sportslogos.net/${gameInfo.team[teamType]}.png`"
              onerror="this.src = '/logo.png'" />
          </div>
        </template>
        <div
          class="game-info"
          :style="{
            order: getOrderPairFromIndex(latestGameInfos.length)[0],
          }">
          <span class="game-desc-main">2023 ... 2024</span>
          <span class="game-desc-sub">精彩回顧</span>
        </div>
        <div
          class="game-arena"
          :style="{
            order: getOrderPairFromIndex(latestGameInfos.length)[1],
          }">
          <img
            alt="game-arena-background"
            class="background"
            style="opacity: 0"
            src="@/assets/game-arena-background.jpg"
            sizes="1346x860" />
          <iframe
            allow="fullscreen"
            class="playlist"
            loading="lazy"
            name="youtube-playlist"
            :src="`https://www.youtube.com/embed?listType=playlist&list=${PLAYLIST_ID}&controls=1`"></iframe>
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
  padding-block-end: 2em
  position: sticky
  top: 0
  width: 100%
  z-index: 2

.bottom
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

    & > *
      width: 100%

    .game-arena
      display: flex

    .game-info
      align-items: flex-start
      display: flex
      flex-direction: column
      gap: 0.5em

      .game-desc-main
        font-size: 0.9em
        font-weight: 500

      .game-desc-sub
        font-size: 0.8em
        font-weight: 400

    .game-arena
      position: relative

      .background
        aspect-ratio: 1346 / 860
        filter: brightness(1.2) contrast(1.2) opacity(0.7)
        position: relative
        width: 100%
        z-index: 0

      .team-logo
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

      .playlist
        height: 100%
        position: absolute
        width: 100%
</style>
