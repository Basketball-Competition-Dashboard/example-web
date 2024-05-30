<template>
  <header>
    <img
      alt="Logo with a basketball"
      id="logo"
      src="@/assets/basketball.png" />
    <h1 id="title">籃球戰情室</h1>
    <button id="auth">Logout</button>
  </header>
</template>

<style scoped lang="sass">
header
  align-items: center
  background-color: #ffc368
  display: flex
  height: auto
  flex-direction: row
  position: relative
  width: 100%

  #logo
    display: block
    height: 9em
    padding-inline: 1.5em
    position: relative
    width: auto

  #title
    color: #000000
    display: block
    height: auto
    font-size: 5em
    font-weight: 700
    position: relative
    width: 100%
  
  #auth
    color: #ffffff
    cursor: pointer
    display: block
    height: auto
    font-size: 2.25em
    text-decoration: underline
    padding-inline-end: 1em
    width: auto
</style>
