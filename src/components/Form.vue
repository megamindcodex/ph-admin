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
          v-model="formData.name"
        >
        </v-text-field>

        <v-text-field
          type="text"
          density="compact"
          placeholder="product category"
          variant="outlined"
          v-model="formData.category"
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
          v-model="formData.brand"
        >
        </v-text-field>
        <v-text-field
          class="w-50"
          type="number"
          density="compact"
          placeholder="product Price"
          variant="outlined"
          v-model="formData.price"
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
          v-model="formData.description"
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
              v-for="(tag, index) in formData.tags"
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
          v-model="formData.productImageURL"
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
        <v-btn class="w-50" @click="addProduct">add product</v-btn>
        <v-btn class="w-50" @click="removeForm">cancle</v-btn>
      </div>
    </v-card>
  </div>
</template>
  
  <script setup>
import axios from "axios";
import { endpoint } from "@/constants/endpoint";
import { reactive, ref, defineProps } from "vue";
import { useProductsStore } from "../store/getAllProduct";

const { removeForm } = defineProps(["removeForm"]);

const productStore = useProductsStore();

const formData = reactive({
  name: "",
  category: "",
  brand: "",
  price: null,
  description: "",
  tags: [],
  productImageURL: "",
});
const imageURL = ref("");
const tag = ref("");

const getImage = () => {
  imageURL.value = formData.productImageURL;
};

const addTag = () => {
  if (tag.value.length > 0) {
    formData.tags.push(tag.value);
    tag.value = "";
  }
};

const removeTag = (index) => {
  formData.tags.splice(index, 1);
};

const addProduct = async () => {
  try {
    console.log(`data to be sent ${formData}`);
    const res = await axios.post(`${endpoint}/api/addproduct`, formData);

    if (res.status === 201) {
      console.log(res.data);

      formData.productImageURL = "";
      formData.name = "";
      formData.category = "";
      formData.brand = "";
      formData.price = "";
      formData.description = "";
      // formData.tags = [];
      tag.value = "";
      productStore.getAllProducts();
      removeForm();
    }
  } catch (err) {
    console.log(err.message);
  }
};
</script>
  
  <style scoped>
.cont {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(202, 218, 218);
  padding: 1rem;
} */

/* .col1 {
  width: 100%;
  display: flex;
  flex-direction: column;
} */

/* .col2 {
  display: flex;
  column-gap: 0.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
} */

/* .form-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
} */

/* input[type="text"] {
  margin-top: 1rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 2.7px;
  border: none;
} */

/* .btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
} */

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
}

.tags {
  display: flex;
  width: 100%;
  overflow: auto;
  height: 40px;
}

/* .tags span {
  position: absolute;
  top: -4px;
  right: 2px;
  padding: 2px;
  color: #ffff;
  cursor: pointer;
} */
</style>
  
