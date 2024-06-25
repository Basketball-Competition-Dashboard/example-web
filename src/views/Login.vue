<script setup lang="ts">
import { handleError, ref } from 'vue';
import CustomInput from '@/components/CustomInput.vue';
import {postAuthSession,} from '@/generated/web-api';
import {
  hasSession,
} from '@/generated/web-api/cookies.ts';
import router from '@/router';

const title = ref('登入');
const accountLabel = ref('帳號 :');
const account = ref('');
const passwordLabel = ref('密碼 :');
const password = ref('');

const handleSubmit = async () => {
  try {
    const response = await postAuthSession({
      requestBody: {
        name: account.value as string,
        credential: password.value as string,
      },
    });
    console.log(response);
    hasSession();
    router.push('/')
  } catch (error) {
    alert(error);
    return;
  }
}
</script>

<template>
  <div id="login">
  <form @submit.prevent="handleSubmit">
    <h1>{{ title }}</h1>
    <CustomInput v-model="account" :label="accountLabel" />
    <CustomInput v-model="password" :label="passwordLabel" />
    <button type="submit">登入</button>
  </form >
</div>
</template>

<style scoped lang="sass">
h1
  font-size: 3rem
  font-weight: bold
form
  width: 40%
  text-align: center
#login
  justify-content: center
  display: flex
button
  font-size: 2rem
  background-color: #1991D4
  color: #ffffff
  border-radius: 23px
  padding: 1%
  text-align: center
  width: 45%

</style>
