function Authenticated(): boolean {
  const store = useStore();
  const token = store.isAuthenticated;
  return token !== '';
}

export default defineNuxtRouteMiddleware((to, from) => {
  if (!Authenticated() && to.path !== '/login') {
    return navigateTo('/login');
  }
});
