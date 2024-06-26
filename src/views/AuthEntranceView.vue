<script setup lang="ts">
import { ref } from 'vue';
import { useAuthSessionStore } from '@/stores/authSession';
import { Toast } from '@/functions/toast';
import { router } from '@/router';

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
  <form
    class="auth-entrance-view-vue"
    @submit.prevent="login">
    <h1>{{ $route.name }}</h1>
    <label for="basketball-competition-dashboard-name">名稱</label>
    <input
      v-model="name"
      type="text"
      id="basketball-competition-dashboard-name" />
    <label for="basketball-competition-dashboard-credential">密碼</label>
    <input
      v-model="credential"
      type="password"
      id="basketball-competition-dashboard-credential" />
    <button type="submit">登入</button>
  </form>
</template>

<style scoped lang="sass">
.auth-entrance-view-vue
  align-items: center
  display: flex
  flex-direction: column
  width: 100%

h1
  margin-top: 4.5rem
  font-size: 3rem
  font-weight: bold

button
  margin-top: 2rem
  font-size: 2rem
  background-color: #1991d496
  border-radius: 23.01px
  color: #ffffff
  padding: 1%
  text-align: center
  width: 24%

label
  text-align: left
  display: block
  font-size: 1rem
  font-weight: 600
input
  width: 100%
  height: 3rem
  font-size: 2rem
  border-radius: 16px
  border: 1.53px solid
  border-color: #0000001a
</style>
