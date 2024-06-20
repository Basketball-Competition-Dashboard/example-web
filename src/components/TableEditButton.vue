<script setup lang="ts">
defineProps<{
  label: 'Create' | 'Delete' | 'Save' | 'Update';
}>();
defineEmits<{
  edit: [label: 'Create' | 'Delete' | 'Save' | 'Update'];
}>();
</script>

<template>
  <div id="table-edit-button-vue">
    <button
      @click="$emit('edit', label)"
      :data-label="label">
      {{ label }}
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
  transition: filter 0.25s linear

  &:hover
    cursor: pointer
    filter: brightness(0.85)

  &[data-label="Create"]
    background-color: #4186d7
    color: #ffffff

  &[data-label="Delete"]
    background-color: #dd2323
    color: #ffffff

  &[data-label="Save"]
    background-color: #f7bb46
    color: #ffffff

  &[data-label="Update"]
    background-color: #59a734
    color: #ffffff
</style>
