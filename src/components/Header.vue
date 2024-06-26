<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAuthSessionStore } from '@/stores/authSession';
import { Toast } from '@/functions/toast';

const authSession = useAuthSessionStore();

const handleSubmit = async () => {
  try {
    await authSession.delete();
    Toast.showSuccess('Logout');
  } catch (error) {
    Toast.showFailure('Logout', error);
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
      v-if="authSession.exists"
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
