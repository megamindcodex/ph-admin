<template>
  <div class="cont">
    <v-card class="w-100 pa-4 bg-black" max-width="448" rounded="lg">
      <div class="form-group w-100">
        <v-text-field
          density="compact"
          placeholder="category name"
          variant="outlined"
          v-model="formData.name"
        >
        </v-text-field>
      </div>
      <div class="form-group">
        <v-text-field
          density="compact"
          placeholder="category description"
          variant="outlined"
          v-model="formData.description"
        >
        </v-text-field>
      </div>
      <div class="form-group">
        <v-text-field
          density="compact"
          placeholder="number available of category items"
          variant="outlined"
          v-model="formData.noItems"
        >
        </v-text-field>
      </div>
      <div class="form-group">
        <v-text-field
          density="compact"
          placeholder="category Image URL"
          variant="outlined"
          v-model="formData.categoryImageURL"
        >
        </v-text-field>
      </div>
      <div class="btn w-100 d-flex ga-4">
        <v-btn
          class="mb-4 w-50"
          color="blue"
          size="large"
          variant="tonal"
          @click="addCategory"
          >Add category</v-btn
        >
        <v-btn
          class="mb-4 w-50"
          color="blue"
          size="large"
          variant="tonal"
          @click="removeForm"
          >cancel</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { useCategoriesStore } from "@/store/categories";
import axios from "axios";
import { reactive, ref, defineProps } from "vue";

const categoriesStore = useCategoriesStore();

const { removeForm } = defineProps(["removeForm"]);

const formData = reactive({
  name: "",
  description: "",
  noItems: "",
  categoryImageURL: "",
});

const addCategory = async () => {
  try {
    console.log(`data to be sent ${formData}`);
    const res = await axios.post(
      "http://localhost:5000/api/addCategory",
      formData
    );

    if (res.status === 201) {
      console.log(res.data);

      formData.name = "";
      formData.description = "";
      formData.noItems = "";
      formData.categoryImageURL = "";
      categoriesStore.getAllCategories();
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
</style>