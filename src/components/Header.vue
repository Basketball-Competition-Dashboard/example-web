<template>
  <header class="header-vue">
    <img
      alt="Logo with a basketball"
      id="logo"
      sizes="160x145"
      src="@/assets/logo.png" />
    <h1 id="title">籃球戰情室</h1>
    <button id="auth">Logout</button>
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

  button#auth
    color: #ffffff
    cursor: pointer
    font-size: 2.25em
    padding-inline: 1em
    text-decoration: underline

  ::selection
    background-color: #ffad33
</style>
