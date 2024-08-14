<template>
  <div>
    <v-row style="gap: 1rem;margin: 1rem;">
      <v-card>
        <v-card-title>
          <h2>Detalles de cuenta</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field variant='outlined' label="Nuevo nombre"></v-text-field>
          <v-text-field variant='outlined' label='Nueva contraseña'></v-text-field>
          <v-text-field variant='outlined' label='Confirmar contraseña'></v-text-field>
        </v-card-text>
        <v-card-actions style="display:flex;flex-direction: row;justify-content: flex-end;">
          <v-btn variant="tonal" color='primary' @click="handleEditAccount">Guardar cambios</v-btn>
        </v-card-actions>
      </v-card>
      <v-card class='fixed-height-card'>
        <v-card-title>
          <h2>Sesión</h2>
        </v-card-title>
        <v-card-actions>
          <v-btn variant="tonal" color='danger' @click="handleLogout">Cerrar sesión</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

  </div>
</template>

<script setup>
import { useMutationState } from '@tanstack/vue-query';

const logout = useMutationState({
  queryKey: 'logout',
  queryFn: async () => {
    const response = await fetch(`${config.public.baseUrl}/api/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
  onSuccess: () => {
    store.clearBearerToken();
    store.clearRole();
    router.push({ path: '/login' });
  },
  onError: (error) => {
    console.error('Logout failed:', error);
  },
});
const editAccount = useMutationState({
  queryKey: 'editAccount',
  queryFn: async () => {
    const response = await fetch(`${config.public.baseUrl}/api/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
  onSuccess: () => {
    store.clearBearerToken();
    store.clearRole();
    router.push({ path: '/login' });
  },
  onError: (error) => {
    console.error('Logout failed:', error);
  },
});
function handleEditAccount() {
  editAccount.mutate();
}
function handleLogout() {
  logout.mutate();
}
</script>

<style scoped>
.fixed-height-card {
  flex: 0 1 auto;

  height: 10rem;
  overflow: hidden;

}
</style>