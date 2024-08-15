import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'storeIndex',
  state: () => ({
    bearerToken: '',
    role: 0,
    userDetails: {},
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
    setUserDetails(userDetails: any) {
      this.userDetails = userDetails;
    },
    clearUserDetails() {
      this.userDetails = {};
    },
    logout() {
      this.clearBearerToken();
      this.clearRole();
      this.clearUserDetails();
    },
  },
  getters: {
    isAuthenticated(): any {
      return this.bearerToken || null;
    },
    hasRole(): any {
      return this.role || 0;
    },
    getUserDetails(): any {
      return this.userDetails || {};
    },
  },
  persist: true,
});
