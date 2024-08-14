function Authenticated(): boolean {
  const store = useStore();
  const token = store.isAuthenticated;
  return token !== '';
}

function hasRole(): number {
  const store = useStore();
  const role = store.role;
  return role;
}

export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = Authenticated();
  const role = hasRole();

  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login');
  } else if (isAuthenticated && to.path === '/login') {
    if (role === 1) {
      console.log('User', role);

      return navigateTo('/user');
    } else if (role === 2) {
      return navigateTo('/products');
    }
  } else if (isAuthenticated && to.path === '/') {
    if (role === 1) {
      return navigateTo('/user');
    } else if (role === 2) {
      return navigateTo('/products');
    }
  }
});
