import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'storeIndex',
  state: () => ({
    bearerToken: '',
    role: 0,
  }),
  actions: {
    setBearerToken(token: string) {
      this.bearerToken = token;
    },
    clearBearerToken() {
      this.bearerToken = '';
    },
    setRole(role: number) {
      this.role = role;
    },
    clearRole() {
      this.role = 0;
    },
  },
  getters: {
    isAuthenticated(): any {
      return this.bearerToken || null;
    },
    hasRole(): any {
      return this.role || 0;
    },
  },
  persist: true,
});
