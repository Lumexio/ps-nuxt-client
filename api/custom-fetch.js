export const customFetch = async (url, options = {}) => {
 const token = useStore();
 console.log('token.isAuthenticated', token.isAuthenticated);
 const headers = {
  ...options.headers,
  'Authorization': `Bearer ${token.isAuthenticated}`,
 };
 const response = await fetch(url, {
  ...options,
  headers,
 });
 if (!response.ok) {
  throw new Error('Network response was not ok');
 }
 return response.json();
};