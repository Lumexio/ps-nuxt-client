// this is temporarlily solution for auth middleware before a fetch the login method from the backend

var localSt = () => {
  const store = useStore();
  return store.isAuthenticated;
};
// Example implementation of isAuthenticated function
function isAuthenticated(): boolean {
  // Replace with actual authentication check logic
  const token = localSt;
  return token !== null;
}

export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated

  if (!isAuthenticated() && to.path !== '/login') {
    return navigateTo('/login');
  }
});
