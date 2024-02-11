
<template>
  <div class="cont">
    <v-card class="w-100 pa-4 bg-black" max-width="448" rounded="lg">
      <div class="form-group w-100">
        <v-text-field
          density="compact"
          placeholder="category name"
          variant="outlined"
          v-model="categoryToUpdate.name"
        >
        </v-text-field>
      </div>
      <div class="form-group">
        <v-text-field
          density="compact"
          placeholder="category description"
          variant="outlined"
          v-model="categoryToUpdate.description"
        >
        </v-text-field>
      </div>
      <div class="form-group">
        <v-text-field
          density="compact"
          placeholder="number available of category items"
          variant="outlined"
          v-model="categoryToUpdate.noItems"
        >
        </v-text-field>
      </div>
      <div class="form-group">
        <v-text-field
          density="compact"
          placeholder="category Image URL"
          variant="outlined"
          v-model="categoryToUpdate.categoryImageURL"
        >
        </v-text-field>
      </div>
      <div class="btn w-100 d-flex ga-4">
        <v-btn
          class="mb-4 w-50"
          color="blue"
          size="large"
          variant="tonal"
          @click="updateCategory"
          >Add category</v-btn
        >
        <v-btn
          class="mb-4 w-50"
          color="blue"
          size="large"
          variant="tonal"
          @click="removeForm"
          >cancle</v-btn
        >
      </div>
    </v-card>
  </div>
</template>
  
  <script setup>
import axios from "axios";
import { defineProps } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { endpoint } from "@/constants/endpoint";

// Define props explicitly using defineProps
const { category, categoryToUpdate, getCategoryDetail, removeForm } =
  defineProps([
    "category",
    "categoryToUpdate",
    "getCategoryDetail",
    "removeForm",
  ]);

const route = useRoute();
const router = useRouter();

const updateCategory = async () => {
  try {
    const categoryName = route.params.name;
    const res = await axios.put(
      `${endpoint}/api/updateCategory/${categoryName}`,
      categoryToUpdate
    );
    if (res.status === 200) {
      category.value = res.data;
      // the if statement below checks if the category
      // name is equal to the route parameter.
      // and if it is not equal it redirects to categories page
      if (category.value.name !== categoryName) {
        router.push("/categories");
        // router.push(category.value.name);
      } else {
        getCategoryDetail();
      }
      removeForm();
    } else {
      console.error(
        "Failed to update category content. Unexpected status code:",
        res.status
      );
    }

    console.log(res.data);
  } catch (err) {
    console.log("Fialed to Update category content", err.message);
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
</style>