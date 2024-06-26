<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { deleteSession, isSession } from '@/functions/cookies';
import { deleteAuthSession } from '@/generated/web-api';
import { router } from '@/router';

const handleSubmit = async () => {
  try {
    await deleteAuthSession();
    deleteSession();
    router.go(0);
  } catch (error) {
    alert(error);
  }
};
</script>

<template>
  <header class="header-vue">
    <img
      alt="Logo with a basketball"
      id="logo"
      sizes="160x145"
      src="@/assets/logo.png" />
    <h1 id="title">籃球戰情室</h1>
    <button
      v-if="isSession()"
      id="auth"
      @click="handleSubmit">
      Logout
    </button>
    <RouterLink
      v-else
      id="auth"
      to="/auth/entrance">
      Login
    </RouterLink>
  </header>
</template>

<style scoped lang="sass">
header
  background-color: #ffc368
  display: flex
  align-items: center

  #logo
    aspect-ratio: 160 / 145
    color: #ffffff
    height: 9em
    margin-block: 0.35em
    margin-inline: 1.5em

  #title
    color: #000000
    font-size: 5em
    font-weight: 700
    min-width: max-content
    width: 100%

  #auth
    color: #ffffff
    cursor: pointer
    font-size: 2.25em
    padding-inline: 1em
    text-decoration: underline

  ::selection
    background-color: #ffad33
</style>
