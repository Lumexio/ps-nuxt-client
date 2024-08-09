// this is temporarlily solution for auth middleware before a fetch the login method from the backend
var localStorage = {
  key: 'token',
};
// Example implementation of isAuthenticated function
function isAuthenticated(): boolean {
  // Replace with actual authentication check logic
  const token = localStorage.key;
  return token !== null;
}

export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated

  if (!isAuthenticated() && to.path !== '/login') {
    return navigateTo('/login');
  }
});
