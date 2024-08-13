<template>
 <v-responsive>
  <v-app>
   <nav-drawer :items="listAdmin" />
   <v-main>
    <slot />
   </v-main>
  </v-app>
 </v-responsive>
</template>
<script setup>
const router = useRouter();
const listAdmin = ref([
 { title: "Usuarios", icon: "mdi-account-multiple", to: "/user" },
 { title: "Productos", icon: "mdi-package-variant-closed", to: "/products" },
 { title: "Categorias", icon: "mdi-folder-multiple", to: "/category" },

]);
const listUser = ref([
 { title: "Productos", icon: "mdi-package-variant-closed", to: "/products" },
 { title: "Categorias", icon: "mdi-folder-multiple", to: "/category" },
]);


</script>