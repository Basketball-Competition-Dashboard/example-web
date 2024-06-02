import { defineStore } from 'pinia';
import { getPing } from '@/generated/web-api';

const pingStore = defineStore('ping', {
  state: () => ({
    _value: '',
  }),
  getters: {
    value(state) {
      return state._value;
    },
  },
  actions: {
    async ping() {
      this._value = await getPing();
    },
  },
});

export default pingStore;
