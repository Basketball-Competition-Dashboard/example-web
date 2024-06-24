<template>
  <div>
    <label :for="label">{{ label }}</label>
    <input :id="label" v-model="inputValue" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  label: String
});

const emit = defineEmits(['update:modelValue']);
const inputValue = ref(props.modelValue);

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});
</script>
