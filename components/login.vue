<template>
 <v-card max-width="30rem" min-width="12rem">
  <v-card-title><brand-title /></v-card-title>
  <v-card-text>
   <v-text-field variant="outlined" v-model="email" label="nombre de usuario" type="email"></v-text-field>
   <v-text-field variant="outlined" v-model="password" label="Contraseña" type="password"></v-text-field>
  </v-card-text>
  <v-card-actions class="flex justify-end gap-4">
   <v-btn color="info" variant="tonal" @click="clean">Limpiar
    <v-icon right>mdi-eraser</v-icon>
   </v-btn>
   <v-btn color="primary" variant="tonal">Login
    <v-icon right>mdi-login</v-icon>
   </v-btn>
  </v-card-actions>
 </v-card>
</template>

<script setup lang="ts">
// password and email on type script notation
// and composition api notation
let password = ref('');
let email = ref('');

// function to clean the fields
const clean = () => {
 password.value = '';
 email.value = '';
}

</script>

<style></style>