<template>
  <div class="customInput">
    <label :for="label">{{ label }}</label>
    <input
      :id="label"
      v-model="inputValue" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  label: String,
});

const emit = defineEmits(['update:modelValue']);
const inputValue = ref(props.modelValue);

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  },
);
</script>

<style scoped lang="sass">
.customInput
  margin: 2rem
label
  text-align: left
  display: block
  font-size: 1rem
input
  width: 100%
  height: 3rem
  font-size: 3rem
  border-radius: 23px
</style>
