<template>
  <v-container class="cont">
    <div class="product" v-if="product">
      <div class="action">
        <button
          :class="{ notdeployed: !isDeployed, deployed: isDeployed }"
          @click="deployProduct"
        >
          {{ text }}
        </button>
        <span class="editBtn" @click="showForm">Edit</span>
      </div>
      <div class="mainImage">
        <v-img :src="product.productImageURL" :alt="product.name" />
      </div>
      <div class="desc pa-4 d-flex flex-column ga-4">
        <div class="info d-flex flex-column justify-center">
          <h3>{{ product.name }}</h3>
          <h3>{{ product.category }}</h3>
          <p>{{ product.brand }}</p>
          <p>${{ product.price }}</p>
          <p><b>decription:</b> <br />{{ product.description }}</p>
        </div>

        <div class="tags d-flex w-100 align-center">
          <v-chip
            size="small"
            class="tag bg-info"
            v-for="tag in product.tags"
            :key="tag"
          >
            <span>#{{ tag }}</span>
          </v-chip>
        </div>
      </div>
      <div class="delete pa-4">
        <button @click="deleteProduct">delete</button>
      </div>
    </div>

    <v-dialog v-model="isFormVisible">
      <UpdateForm
        :product="product"
        :productToUpdate="productToUpdate"
        :isFormVisible="isFormVisible"
        :getProductDetail="getProductDetail"
        :removeForm="removeForm"
      />
    </v-dialog>
  </v-container>
</template>

<script setup>
import axios from "axios";
import UpdateForm from "../components/UpdateForm.vue";
import { endpoint } from "../constants/endpoint";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const product = ref({});
const deployed = ref(false);
const isDeployed = ref(false);
const text = ref("");
const isFormVisible = ref(false);
const route = useRoute();
const router = useRouter();
const productId = ref(route.params.id);
const productToUpdate = reactive({
  name: product.name,
  category: product.category,
  brand: product.brand,
  price: product.price,
  description: product.description,
  tags: product.tags,
  productImageURL: product.productImageURL,
});

const getProductDetail = async () => {
  try {
    const productId = route.params.id;
    const res = await axios.get(`${endpoint}/api/productDetail/${productId}`);

    if (res.status === 200) {
      product.value = res.data;
      // console.log(res.data)
    }
  } catch (err) {
    console.log("Failed to get product detail", err.message);
  }
};
const deployProduct = async () => {
  try {
    const productId = route.params.id;
    const res = await axios.put(`${endpoint}/api/deployProduct/${productId}`);

    if (res.status === 200) {
      checkDeploy();
    }
  } catch (err) {
    console.error("Error setting product deploy property", err.message);
  }
};
const checkDeploy = async () => {
  try {
    const productId = route.params.id;
    const res = await axios.get(`${endpoint}/api/checkDeploy/${productId}`);

    if (res.status === 200) {
      isDeployed.value = res.data;
      console.log("product deployed", res.data);
      if (!isDeployed.value) {
        text.value = "undeployed";
      } else {
        text.value = "deployed";
      }
    }
  } catch (err) {
    console.error("Error checking product deploy property");
  }
};
const deleteProduct = async () => {
  try {
    console.log(productId.value);
    const res = await axios.post(
      `${endpoint}/api/deleteProduct/${productId.value}`
    );

    if (res.status === 200) {
      console.log("product deleted", res.data);
      router.push("/");
    }
  } catch (err) {
    console.error("Error deleting product", err.message);
  }
};
const showForm = () => {
  isFormVisible.value = true;

  productToUpdate.name = product.value.name;
  productToUpdate.category = product.value.category;
  productToUpdate.brand = product.value.brand;
  productToUpdate.price = product.value.price;
  productToUpdate.description = product.value.description;
  productToUpdate.tags = product.value.tags;
  productToUpdate.productImageURL = product.value.productImageURL;
};

const removeForm = () => {
  isFormVisible.value = false;
  getProductDetail();
};

onMounted(() => {
  getProductDetail();
  checkDeploy();
});
</script>

<style scoped>
.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  /* background: crimson; */
}

.editBtn {
  font-weight: bold;
  padding: 0.5rem 1rem;
  position: relative;
  color: white;
  background-color: blue;
  border-radius: 4px;
  cursor: pointer;
}
.action button {
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.4rem 0.8rem;
  margin-bottom: 0.2rem;
  cursor: pointer;
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

.delete button {
  font-weight: bold;
  font-size: 1rem;
  padding: 0.6rem 2rem;
  border: none;
  border-radius: 3px;
  color: white;
  background-color: crimson;
  cursor: pointer;
}

.delete button:hover {
  background-color: rgb(194, 17, 53);
}

.cont {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}

.product {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  background-color: #ffff;
  border-radius: 8px;
}

.mainImage {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.549);
  width: 100%;
  height: auto;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
}

.mainImage img {
  text-align: center;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 5px;
}

.closeBtn {
  position: absolute;
  top: 14.7%;
  right: 20%;
  font-size: 20rem;
  font-weight: bolder;
  cursor: pointer;
  color: white;
  z-index: 400;
}

/* .tags {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;
  text-align: center;
} */

.tags {
  display: flex;
  width: 100%;
  overflow: auto;
  height: 40px;
}
</style>
