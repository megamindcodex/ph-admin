



<template>
  <div class="menu">
    <span class="material-symbols-outlined pa-2" @click.stop="drawer = !drawer"
      >menu</span
    >
  </div>
  <v-navigation-drawer v-model="drawer" temporary="" class="drawer">
    <!-- <div class="close">
      <span class="material-symbols-outlined pa-2" @click="drawer = !drawer">
        close
      </span>
    </div> -->
    <!-- <v-btn
      variant="text"
      icon="mdi-chevron-left ml-10"
      @click.stop="rail = !rail"
    >   
      <span class="material-symbols-outlined"> chevron_left </span>
    </v-btn> -->
    <Navbar />
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";

const drawer = ref(true);
const rail = ref(true);
</script>

<style scoped>
.menu {
  cursor: pointer;
}
</style>