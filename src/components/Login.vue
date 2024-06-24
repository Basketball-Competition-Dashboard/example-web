<script setup lang="ts">
import { handleError, ref } from 'vue';
import CustomInput from '@/components/CustomInput.vue';

const title = ref('登入');
const accountLabel = ref('帳號');
const account = ref('');
const passwordLabel = ref('密碼');
const password = ref('');

const handleSubmit = () => {
  console.log('account is ', account.value);
  console.log('password is ', password.value);
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>{{ title }}</h1>
    <CustomInput v-model="account" :label="accountLabel" />
    <CustomInput v-model="password" :label="passwordLabel" />
    <button type="submit">登入</button>
  </form >
</template>

<style scoped lang="sass">
</style>
