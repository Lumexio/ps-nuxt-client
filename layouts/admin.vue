<template>
 <v-responsive>
  <v-app>
   <nav-drawer :items="items" />
   <v-main>
    <slot />
   </v-main>
  </v-app>
 </v-responsive>
</template>
<script setup>
const router = useRouter();
const items = ref([
 { title: "Usuarios", icon: "mdi-user", to: "/user" },
 { title: "Productos", icon: "mdi-package-variant-closed", to: "/products" },
 { title: "Categorias", icon: "mdi-package-variant-closed", to: "/categories" },

]);
</script>