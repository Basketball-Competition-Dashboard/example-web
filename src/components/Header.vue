<template>
  <div class="header-vue">
    <header id="grid">
      <img
        alt="Logo with a basketball"
        id="logo"
        src="@/assets/logo.png" />
      <h1 id="title">籃球戰情室</h1>
      <button id="auth">Logout</button>
    </header>
  </div>
</template>

<style scoped lang="sass">
#grid
  display: grid
  grid-template-areas: "logo title auth"
  grid-template-columns: min-content auto min-content
  grid-template-rows: min-content
  align-items: center

  #logo
    grid-area: logo

  #title
    grid-area: title

  #auth
    grid-area: auth

header
  background-color: #ffc368

img#logo
  aspect-ratio: 160 / 145
  height: 9em
  margin: 0.35em 1.5em

h1#title
  color: #000000
  font-size: 5em
  font-weight: 700

button#auth
  color: #ffffff
  cursor: pointer
  font-size: 2.25em
  text-decoration: underline
  padding-inline: 1em
</style>
