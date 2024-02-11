<template>
  <div class="cont">
    <v-card
      class="w-100 pa-4 bg-black d-flex flex-column"
      max-width="448"
      rounded="lg"
    >
      <div class="d-flex ga-2">
        <v-text-field
          type="text"
          density="compact"
          placeholder="product name"
          variant="outlined"
          v-model="productToUpdate.name"
        >
        </v-text-field>

        <v-text-field
          type="text"
          density="compact"
          placeholder="product category"
          variant="outlined"
          v-model="productToUpdate.category"
        >
        </v-text-field>
      </div>

      <div class="d-flex w-100 ga-2">
        <v-text-field
          class="w-50"
          type="text"
          density="compact"
          placeholder="product Brand"
          variant="outlined"
          v-model="productToUpdate.brand"
        >
        </v-text-field>
        <v-text-field
          class="w-50"
          type="number"
          density="compact"
          placeholder="product Price"
          variant="outlined"
          v-model="productToUpdate.price"
        >
        </v-text-field>
      </div>

      <div class="form-group">
        <v-textarea
          label="Product Description"
          density="compact"
          variant="outlined"
          no-resize
          rows="2"
          row-height="15"
          shaped
          v-model="productToUpdate.description"
        >
        </v-textarea>
      </div>

      <div class="d-flex w-100 flex-column position-relative">
        <div class="d-flex ga-2">
          <v-text-field
            class="w-50"
            type="text"
            density="compact"
            placeholder="Input tag"
            variant="outlined"
            v-model="tag"
          >
          </v-text-field>
          <v-btn class="w-50 pa-5 d-flex" @click="addTag">add tag</v-btn>
        </div>
        <div class="tagsCont d-flex align-center w-10 pb-4">
          <div class="tags">
            <v-chip
              size="x-small"
              class="bg-info tag"
              v-for="(tag, index) in productToUpdate.tags"
              :key="index"
              @click="removeTag(index)"
              ><span>#{{ tag }}</span>
            </v-chip>
          </div>
        </div>
      </div>

      <div class="form-group">
        <v-text-field
          type="text"
          density="compact"
          placeholder="Image URL"
          variant="outlined"
          v-model="productToUpdate.productImageURL"
          @input="getImage"
        >
        </v-text-field>
      </div>

      <div class="form-group">
        <div class="imgCont">
          <div class="image">
            <v-img :src="imageURL" alt="image here..." />
          </div>
        </div>
      </div>

      <div class="w-100 d-flex ga-4 pa-4">
        <v-btn class="w-50" @click="updateProduct">Update product</v-btn>
        <v-btn class="w-50" @click="removeForm">cancle</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, onMounted } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// Define props explicitly using defineProps
const {
  product,
  productToUpdate,
  getProductDetail,
  isFormVisible,
  removeForm,
} = defineProps([
  "product",
  "productToUpdate",
  "getProductDetail",
  "isFormVisible",
  "removeForm",
]);

const route = useRoute();
// const router = useRouter();

const imageURL = ref("");
const tag = ref("");
const getImage = () => {
  imageURL.value = productToUpdate.productImageURL;
};

const productTags = productToUpdate.tags;

const addTag = () => {
  if (tag.value.length > 0) {
    productToUpdate.tags.push(tag.value);
    tag.value = "";
  }
};
const removeTag = (index) => {
  productToUpdate.tags.splice(index, 1);
};

const updateProduct = async () => {
  try {
    const productId = route.params.id;
    const res = await axios.put(
      `http://localhost:5000/api/updateProduct/${productId}`,
      productToUpdate
    );
    if (res.status === 200) {
      product.value = res.data;
      console.log("product updated", res.data);
      getProductDetail();
      removeForm();
    } else {
      console.error(
        "Failed to update product. Unexpected status code:",
        res.status
      );
    }

    console.log(res.data);
  } catch (err) {
    console.log("Fialed to Update product content", err.message);
  }
};

onMounted(() => {
  getImage();
});
</script>

<style scoped>
.cont {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* background: orange; */
}

.imgCont {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.549);
  width: 260px;
  height: 160px;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
}

.image img {
  position: relative;
  text-align: center;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 5px;
}

.btn button {
  font-weight: bold;
  text-align: center;
  padding: 0.5rem;
  width: 35%;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

/* .tagsCont {
  position: relative;
  background: teal;
  justify-content: end;
  align-items: center;
  text-align: center;
} */

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