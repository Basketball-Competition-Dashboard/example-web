<template>
  <header :class="$style.head">
    <div :class="$style.basketball1Parent">
      <img
        :class="$style.basketball1Icon"
        loading="lazy"
        alt=""
        src="../assets/basketball%201.png" />
      <div :class="$style.wrapper">
        <h1 :class="$style.h1">籃球戰情室</h1>
      </div>
    </div>
    <div :class="$style.loginWrapper">
      <a :class="$style.login">Logout</a>
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Head',
});
</script>
<style module>
.basketball1Icon {
  height: 9.063rem;
  width: 10rem;
  position: relative;
  object-fit: cover;
}
.h1 {
  margin: 0;
  align-self: stretch;
  height: 5.888rem;
  position: relative;
  font-size: inherit;
  font-weight: 700;
  font-family: inherit;
  display: inline-block;
  flex-shrink: 0;
}
.wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-6xl-5) 0rem 0rem;
  box-sizing: border-box;
  max-width: 100%;
}
.basketball1Parent {
  width: 39.688rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
}
.login {
  text-decoration: underline;
  align-self: stretch;
  position: relative;
  font-weight: 500;
  color: inherit;
}
.loginWrapper {
  width: 8.375rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-39xl-7) 0rem 0rem;
  box-sizing: border-box;
  font-size: var(--font-size-17xl);
  color: var(--color-white);
}
.head {
  flex: 1;
  background: linear-gradient(90deg, #ffc368, #ffc368);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: var(--padding-8xs) var(--padding-xs) var(--padding-7xs)
    var(--padding-4xl);
  box-sizing: border-box;
  max-width: 100%;
  gap: var(--gap-xl);
  text-align: left;
  font-size: var(--font-size-61xl);
  color: var(--color-black);
  font-family: var(--font-inter);
}
</style>
