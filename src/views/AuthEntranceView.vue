<script setup lang="ts">
import { ref } from 'vue';
import CustomInput from '@/components/CustomInput.vue';
import { useAuthSessionStore } from '@/stores/authSession';
import { Toast } from '@/functions/toast';

const title = ref('登入');
const accountLabel = ref('帳號 :');
const account = ref('');
const passwordLabel = ref('密碼 :');
const password = ref('');

const authSession = useAuthSessionStore();

const handleSubmit = async () => {
  try {
    await authSession.create({
      name: account.value as string,
      credential: password.value as string,
    });
    window.location.href = '/';
  } catch (error) {
    Toast.showFailure('Login', error);
    return;
  }
};
</script>

<template>
  <div id="auth-entrance-view">
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
#auth-entrance-view
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
