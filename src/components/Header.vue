<script setup lang="ts">
import { deleteSession,} from '@/generated/web-api/cookies.ts';
import {deleteAuthSession,} from '@/generated/web-api';
import router from '@/router';

const handleSubmit = async () => {
  try{
    const response = await deleteAuthSession();
  }catch(error){
    alert(error)
  }
  deleteSession();
  router.push('/login');
}
</script>


<template>
  <div class="header-vue">
    <header id="grid">
      <img
        alt="Logo with a basketball"
        id="logo"
        src="@/assets/logo.png" />
      <h1 id="title">籃球戰情室</h1>
      <form @submit.prevent="handleSubmit">
        <button id="auth" type="submit">Logout</button>
      </form>
    </header>
  </div>
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

  button#auth
    color: #ffffff
    cursor: pointer
    font-size: 2.25em
    padding-inline: 1em
    text-decoration: underline

  ::selection
    background-color: #ffad33
</style>
