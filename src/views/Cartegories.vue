<template>
  <span>products: {{ categoriesStore.categoriesLenght }}</span>
  <!-- <marquee behavior="alternate"  >Black firday offers are available!!</marquee> -->
  <div class="main">
    <div class="cont">
      <div class="header">
        <span class="addNewBtn" @click="showForm"> New category</span>
      </div>
      <div class="loading" v-if="categoriesStore.loading">
        <span> Loading </span>
      </div>
      <div class="productCont" v-if="categoriesStore.categories">
        <div
          class="product"
          v-for="category in categoriesStore.categories"
          :key="category._id"
        >
          <div class="btn" v-if="!category.deploy">
            <span class="notdeployed"> undeployed </span>
          </div>
          <div class="btn" v-else>
            <span class="deployed"> deployed </span>
          </div>
          <div class="image">
            <img :src="category.categoryImageURL" :alt="category.name" />
          </div>
          <div class="desc">
            <h3>{{ category.name }}</h3>
            <RouterLink :to="'/categoryDetail/' + category.name"
              >modify</RouterLink
            >
          </div>
        </div>
        <span class="addNewCont" @click="showForm"> New product </span>
      </div>
      <div class="productCont" v-else>
        <h3>No Categories found</h3>
      </div>
    </div>
    <div>
      <v-dialog v-model="isFormVisible">
        <CategoryForm :removeForm="removeForm" />
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import CategoryForm from "../components/CategoryForm.vue";
import Backlay from "@/components/Backlay.vue";
import { useCategoriesStore } from "../store/categories";
import { ref } from "vue";

const isFormVisible = ref(false);
const showForm = () => {
  isFormVisible.value = true;
};
const removeForm = () => {
  isFormVisible.value = false;
};

const categoriesStore = useCategoriesStore();
categoriesStore.getAllCategories();
</script>

<style scoped>
marquee {
  width: 100%;
  overflow: hidden;
}
.cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  /* background: crimson; */
}

.addNewBtn {
  font-weight: bold;
  padding: 0.5rem 0.5rem 0.5rem 1.6rem;
  position: relative;
  color: white;
  background-color: blue;
  border-radius: 4px;
  cursor: pointer;
}

.addNewBtn::before {
  content: "+";
  top: 0;
  left: 5px;
  position: absolute;
  font-size: 1.8rem;
  font-weight: bolder;
}

.addNewCont {
  display: flex;
  column-gap: 3px;
  justify-content: center;
  align-items: center;
  padding: 5rem;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 21px;
  font-weight: bold;
  cursor: pointer;
  color: blue;
  border: dashed 2px blue;
}

.addNewCont::before {
  position: relative;
  content: "+";
  top: 0;
  left: 0;
  font-size: 1.8rem;
  font-weight: bolder;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loading span {
  text-align: center;
}

.productCont {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px; /* Adjust gap as needed */
  justify-content: center;
  /* align-items: center; */
  width: 80%;
}

.product {
  display: grid;
  grid-template-rows: 1fr auto; /* Ensure the image takes up available space */
  border: 1px solid #ccc; /* Add border for better separation */
}

.image {
  width: 100%;
  overflow: hidden; /* Ensure images don't exceed their container */
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Maintain aspect ratio and cover the container */
}

.desc {
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
}

.productCont h3 {
  margin: 0; /* Remove default margin for better alignment */
}

.productCont p {
  margin: 0; /* Remove default margin for better alignment */
}

.btn {
  display: flex;
  justify-content: right;
  align-items: center;
}

.btn span {
  color: white;
  border: none;
  /* border-radius: 3px; */
  padding: 0.4rem 0.8rem;
  opacity: 0.5;
}
.deployed {
  background-color: green;
  font-weight: bolder;
}

.notdeployed {
  font-weight: lighter;
  text-decoration-thickness: 1.2px;
  background-color: gray;
}

.closeBtn {
  position: absolute;
  top: 10%;
  right: 20%;
  font-size: 30px;
  font-weight: bolder;
  cursor: pointer;
  color: white;
}
</style>