<template>
  <!-- <marquee behavior="alternate"  >Black firday offers are available!!</marquee> -->
  <v-container
    class="container d-flex justify-center flex-column align-center"
    max-width="700px"
  >
    <div class="header">
      <span>products: {{ productStore.productsLenght }}</span>
      <span class="addNewBtn" @click="showForm"> New product</span>
    </div>
    <div class="loading" v-if="productStore.loading">
      <span> Loading </span>
    </div>
    <div class="productCont" v-if="productStore.products">
      <div
        class="product"
        v-for="product in productStore.products"
        :key="product._id"
      >
        <div class="product-card">
          <div class="btn" v-if="!product.deploy">
            <span class="notdeployed"> undeployed </span>
          </div>
          <div class="btn" v-else>
            <span class="deployed"> deployed </span>
          </div>
          <div class="image bg-white">
            <v-img :src="product.productImageURL" :alt="product.name" />
          </div>
          <div class="desc mt-2 px-2">
            <v-card-title class="text-subtitle-1 pa-0">{{
              product.name
            }}</v-card-title>
            <v-card-title class="text-subtitle-1 pa-0"
              >${{ product.price }}</v-card-title
            >
            <v-card-title class="text-subtitle-1 pa-0">{{
              product.deploy
            }}</v-card-title>

            <RouterLink :to="'/productDetail/' + product._id"
              >modify</RouterLink
            >
          </div>
        </div>
      </div>
      <span class="addNewCont" @click="showForm"> New product </span>
    </div>
    <div class="productCont" v-else>
      <h3>No product found</h3>
    </div>
  </v-container>
  <div>
    <v-dialog v-model="isFormVisible" class="over-lay">
      <Form :removeForm="removeForm" />
    </v-dialog>
  </div>
</template>

<script setup>
import Form from "@/components/Form.vue";
import Backlay from "@/components/Backlay.vue";
import { onMounted, ref } from "vue";
import { useProductsStore } from "../store/getAllProduct";

const isFormVisible = ref(false);

const showForm = () => {
  isFormVisible.value = true;
};

const removeForm = () => {
  isFormVisible.value = false;
};
const productStore = useProductsStore();
productStore.getAllProducts();
</script> 

<style scoped>
marquee {
  width: 100%;
  overflow: hidden;
}
/* .cont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
} */

.header {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 5px;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1228px;
  flex-grow: 1;
}

.product {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none;
  /* color: #ffff; */
  color: #000;
  /* color: #01837b; */
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  /* border-radius: 4px; */
  border: 2px solid #c2c2c2;
  background-color: #ffff;
  /* background-color: #e8e9eb; */
  /* background-color: #f39098; */
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
  /* object-fit: contain; */
  border-radius: 4px 4px 0 0;
}

.image img {
  width: 100%;
  /* object-fit: contain; */
}

.desc {
  display: flex;
  flex-direction: column;
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

/* .over-lay {
  overflow-y: scroll;
} */
@media screen and (min-width: 600px) {
  .productCont {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 5px;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 900px;
    flex-grow: 1;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
  }
}
@media screen and (min-width: 1000px) {
  .productCont {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 5px;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    flex-grow: 1;
  }
}
</style>
