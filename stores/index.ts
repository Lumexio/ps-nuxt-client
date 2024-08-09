import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'storeIndex',
  state: () => ({
    bearerToken: '',
  }),
  actions: {
    setBearerToken(token: string) {
      this.bearerToken = token;
    },
    clearBearerToken() {
      this.bearerToken = '';
    },
  },
  getters: {
    isAuthenticated(): string {
      return this.bearerToken;
    },
  },
  persist: true,
});
