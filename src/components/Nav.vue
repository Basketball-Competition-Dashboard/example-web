<template>
  <div :class="$style.nav">
    <div :class="$style.navigation">
      <div :class="$style.navigationChild" />
      <nav :class="$style.bar">
        <RouterLink to="/" :class="$style.div">最新賽事</RouterLink>
        <RouterLink to="/seasons" :class="$style.div1">球員介紹</RouterLink>
        <RouterLink to="/teams" :class="$style.div2">球隊介紹</RouterLink>
        <RouterLink to="/games" :class="$style.div3">比賽紀錄</RouterLink>
        <RouterLink to="/players" :class="$style.div4">比賽表現</RouterLink>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Nav",
  });
</script>
<style module>
  .navigationChild {
    height: 42.438rem;
    width: 12.813rem;
    position: relative;
    background-color: var(--color-gainsboro);
    display: none;
  }
  .div {
    align-self: stretch;
    height: 3.938rem;
    position: relative;
    font-weight: 500;
    display: inline-block;
    flex-shrink: 0;
  }
  .div1 {
    align-self: stretch;
    height: 3.938rem;
    position: relative;
    font-weight: 500;
    display: inline-block;
    flex-shrink: 0;
  }
  .div2 {
    align-self: stretch;
    height: 3.938rem;
    position: relative;
    font-weight: 500;
    display: inline-block;
    flex-shrink: 0;
  }
  .div3 {
    align-self: stretch;
    height: 3.938rem;
    position: relative;
    font-weight: 500;
    display: inline-block;
    flex-shrink: 0;
  }
  .div4 {
    align-self: stretch;
    height: 3.938rem;
    position: relative;
    font-weight: 500;
    display: inline-block;
    flex-shrink: 0;
  }
  .bar {
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.75rem;
    z-index: 1;
    text-align: left;
    font-size: var(--font-size-17xl);
    color: var(--color-black);
    font-family: var(--font-inter);
  }
  .navigation {
    height: 42.438rem;
    width: 12.813rem;
    background-color: var(--color-gainsboro);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: var(--padding-17xl) var(--padding-4xl) var(--padding-17xl) 1.5rem;
    box-sizing: border-box;
  }
  .nav {
    width: 100%;
    height: 52rem;
    position: relative;
    background-color:  #d9d9d9;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 9.562rem 0rem 0rem;
    box-sizing: border-box;
    line-height: normal;
    letter-spacing: normal;

  }

  @media screen and (max-width: 750px) {
    .div {
      font-size: var(--font-size-10xl);
    }

    .div1 {
      font-size: var(--font-size-10xl);
    }

    .div2 {
      font-size: var(--font-size-10xl);
    }

    .div3 {
      font-size: var(--font-size-10xl);
    }

    .div4 {
      font-size: var(--font-size-10xl);
    }
  }
  @media screen and (max-width: 450px) {
    .div {
      font-size: var(--font-size-3xl);
    }

    .div1 {
      font-size: var(--font-size-3xl);
    }

    .div2 {
      font-size: var(--font-size-3xl);
    }

    .div3 {
      font-size: var(--font-size-3xl);
    }

    .div4 {
      font-size: var(--font-size-3xl);
    }

    .navigation {
      padding-top: var(--padding-4xl);
      padding-bottom: var(--padding-4xl);
      box-sizing: border-box;
    }
  }
  </style>

