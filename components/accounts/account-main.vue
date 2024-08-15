<template>
  <div>
    <v-row style="gap: 1rem; margin: 1rem;">
      <v-card>
        <v-card-title>
          <h2>Detalles de cuenta</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field variant="outlined" label="Nuevo nombre" v-model="newUserDetails.name"></v-text-field>
          <v-text-field variant="outlined" label="Nueva contraseña" v-model="password" type="password"></v-text-field>
          <v-text-field variant="outlined" label="Confirmar contraseña" v-model="confirmPassword"
            type="password"></v-text-field>
        </v-card-text>
        <v-card-actions style="display: flex; flex-direction: row; justify-content: flex-end;">
          <v-btn variant="tonal" color="primary" @click="handleEditAccount">Guardar cambios</v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="fixed-height-card">
        <v-card-title>
          <h2>Sesión</h2>
        </v-card-title>
        <v-card-actions>
          <v-btn variant="tonal" color="danger" @click="handleLogout" :loading="loading">Cerrar sesión</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script setup>



const store = useStore();
const router = useRouter();

let password = ref('');
let confirmPassword = ref('');
let newUserDetails = ref({
  id: store.getUserDetails.id,
  name: '',
  password: '',
});
let loading = ref(false);
const config = useRuntimeConfig();

const logout = useMutation({

  mutationFn: async () => {
    const response = await fetch(`${config.public.baseUrl}/api/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    });
    loading.value = true;
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
  onSuccess: () => {
    store.logout();
    router.push({ path: '/login' }).then(() => {
      loading.value = false;
    })
  },
  onError: (error) => {
    console.error('Failed to logout:', error);
    loading.value = false;
  },
});

const editAccount = useMutation({
  mutationFn: async () => {
    const response = await fetch(`${config.public.baseUrl}/api/users/${store.getUserDetails.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${store.getBearerToken()}`,
      },
      credentials: 'include',
      body: JSON.stringify(newUserDetails.value),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
  onSuccess: (data) => {
    store.setUserDetails(data);
    newUserDetails.value = {
      id: store.getUserDetails.id,
      name: '',
      password: '',
    };
    password.value = '';
    confirmPassword.value = '';
  },
  onError: (error) => {
    console.error('Failed to update account:', error);
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