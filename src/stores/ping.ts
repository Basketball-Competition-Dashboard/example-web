import { defineStore } from 'pinia';
import { getPing } from '@/codegen/web-api-client';

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
      this.value = await getPing();
    },
  },
});
