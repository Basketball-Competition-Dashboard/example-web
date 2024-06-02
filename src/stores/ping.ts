import { defineStore } from 'pinia';
import { Service } from '@/codegen/web-api-client';

export default defineStore('ping', {
  state: () => ({
    value: '',
  }),
  getters: {
    pong(state) {
      return state.value;
    },
  },
  actions: {
    async read() {
      this.value = await Service.getPing();
    },
  },
});
