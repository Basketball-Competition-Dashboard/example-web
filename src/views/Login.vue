<script setup lang="ts">
import { ref } from 'vue';
import CustomInput from '@/components/CustomInput.vue';
import { postAuthSession } from '@/generated/web-api';
import { hasSession } from '@/functions/cookies';

const title = ref('登入');
const accountLabel = ref('帳號 :');
const account = ref('');
const passwordLabel = ref('密碼 :');
const password = ref('');

const handleSubmit = async () => {
  try {
    await postAuthSession({
      requestBody: {
        name: account.value as string,
        credential: password.value as string,
      },
    });
    hasSession();
    window.location.href = '/';
  } catch (error) {
    alert(error);
    return;
  }
};
</script>

<template>
  <div id="login">
    <h1>{{ title }}</h1>
    <CustomInput
      v-model="account"
      :label="accountLabel" />
    <CustomInput
      v-model="password"
      :label="passwordLabel" />
    <button @click="handleSubmit">登入</button>
  </div>
</template>

<style scoped lang="sass">
#login
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
</style>
