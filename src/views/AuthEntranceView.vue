<script setup lang="ts">
import { ref } from 'vue';
import { useAuthSessionStore } from '@/stores/authSession';
import { Toast } from '@/functions/toast';
import { router } from '@/router';
import ViewTitle from '@/components/ViewTitle.vue';

const name = ref<string | undefined>();
const credential = ref<string | undefined>();
const authSession = useAuthSessionStore();

async function login() {
  try {
    await authSession.create({
      name: name.value as string,
      credential: credential.value as string,
    });
    router.replace('/');
  } catch (error) {
    Toast.showFailure('Login', error);
    return;
  }
}
</script>

<template>
  <div class="auth-entrance-view-vue">
    <section class="top">
      <ViewTitle />
    </section>
    <form
      class="center"
      id="BCD-auth-entrance-form"
      @submit.prevent="login">
      <label for="BCD-name">名稱</label>
      <input
        v-model="name"
        type="text"
        id="BCD-name" />
      <label for="BCD-credential">密碼</label>
      <input
        v-model="credential"
        type="password"
        id="BCD-credential" />
      <div class="bottom-button">
        <button type="submit">登入</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="sass">
.auth-entrance-view-vue
  align-items: center
  display: flex
  flex-direction: column
  height: calc(100vh - 9.7em)
  height: calc(100dvh - 9.7em)
  width: 100%
  overflow-y: auto
  overscroll-behavior-y: contain

  .top
    background-color: #ffffff
    left: 0
    padding-block-end: 1em
    position: sticky
    top: 0
    width: 100%
    z-index: 1

.center
  align-items: center
  display: flex
  flex-direction: column
  font-size: 2.5em
  height: 100%
  width: 45%

  .bottom-button
    padding-block: 1.6em
    width: 100%
    text-align: center

    button
      background-color: #1991d496
      border-radius: 0.7em
      color: #ffffff
      cursor: pointer
      font-size: 0.8em
      font-weight: 700
      min-width: max-content
      padding: 0.4em
      text-align: center
      width: 68%

  label
    font-size: 0.6em
    font-weight: 400
    padding-block-start: 1em
    padding-block-end: 0.25em
    text-align: left
    width: 100%

  input
    border: 0.1rem solid #cccccc
    border-radius: 0.38em
    caret-color: #4186d7
    font-family: "Anek Tamil", sans-serif
    font-size: 0.8em
    font-weight: 500
    padding-block: 0.1em
    padding-inline: 0.4em
    text-align: left
    width: 100%

    &:focus
      outline: 0.1rem solid #cccccc

    &::selection
      background-color: #96bce9
</style>
