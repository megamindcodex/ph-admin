<template>
  <div class="cont pa-4">
    <div class="nav-item" @click="navigateTo('Sitesetting')">
      <span>Site setting</span>
    </div>
    <div class="title my-4">
      <span class="text-subtitle-2 font-weight-black">Manage Products</span>
      <div class="" v-for="nav in mainNav" :key="nav">
        <div class="nav-item" @click="navigateTo(nav.path)">
          <span class="text-body-1" @click="navigateTo(nav.path)">{{
            nav.name
          }}</span>
        </div>
      </div>
    </div>
    <div class="nav-item" @click="navigateTo('account')">
      <span>Account setting</span>
    </div>
    <div class="nav-item" @click="navigateTo('manageUsers')">
      <span>Manage Users</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
const mainNav = [
  {
    name: "Products",
    path: "products",
  },
  {
    name: "Categories",
    path: "categories",
  },
];

const route = useRoute();
const router = useRouter();
const currentRoute = ref(null);

const navigateTo = (routeName) => {
  router.push({ name: routeName });
};
</script>

<style scoped>
.cont {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nav-item {
  cursor: pointer;
}

.nav-item:hover {
  color: red;
  transition: ease 0.3s;
}
</style>