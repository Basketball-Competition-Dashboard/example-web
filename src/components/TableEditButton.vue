<script setup lang="ts">
defineProps<{
  mode: 'Create' | 'Delete' | 'Save' | 'Update';
}>();
defineEmits<{
  click: [];
}>();
</script>

<template>
  <div id="table-edit-button-vue">
    <button
      @click="$emit('click')"
      :data-mode="mode">
      {{ mode }}
    </button>
  </div>
</template>

<style scoped lang="sass">
button
  border-radius: 0.15em
  font-family: Inter, sans-serif
  font-size: inherit
  padding-block: 0.25em
  padding-inline: 0.35em
  user-select: none
  -webkit-user-select: none
  transition: filter 0.25s linear

  &:hover
    cursor: pointer
    filter: contrast(1.1) brightness(1.1)

  &[data-mode="Create"]
    background-color: #4186d7
    color: #ffffff

  &[data-mode="Delete"]
    background-color: #dd2323
    color: #ffffff

  &[data-mode="Save"]
    background-color: #f7bb46
    color: #ffffff

  &[data-mode="Update"]
    background-color: #59a734
    color: #ffffff
</style>
