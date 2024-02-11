<template>
  <div class="cont">
    <div class="category" v-if="category">
      <div class="header">
        <button
          :class="{ notdeployed: !isDeployed, deployed: isDeployed }"
          @click="handleDeploy"
        >
          {{ text }}
        </button>
        <span class="editBtn" @click="showForm">Edit</span>
      </div>
      <div class="mainImage">
        <img :src="category.categoryImageURL" :alt="category.name" />
      </div>
      <div class="desc">
        <h3>{{ category.name }}</h3>
        <p>{{ category.description }}</p>
      </div>
    </div>
    <div class="delete">
      <button @click="deleteCategory">delete</button>
    </div>

    <v-dialog v-model="isFormVisible">
      <UpdateCategoryForm
        :category="category"
        :categoryToUpdate="categoryToUpdate"
        :isFormVisible="isFormVisible"
        :getCategoryDetail="getCategoryDetail"
        :removeForm="removeForm"
      />
    </v-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import UpdateCategoryForm from "../components/UpdateCategoryForm.vue";
import { endpoint } from "../constants/endpoint";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const category = ref({});
const isDeployed = ref(false);
const text = ref("");
const isFormVisible = ref(false);
const route = useRoute();
const router = useRouter();
const categoryName = ref(route.params.name);
const categoryToUpdate = reactive({
  name: category.name,
  description: category.description,
  noItems: category.noItems,
  categoryImageURL: category.productImageURL,
});

const getCategoryDetail = async () => {
  try {
    const categoryName = route.params.name;
    // console.log(categoryName);
    const res = await axios.get(
      `${endpoint}/api/categoryDetail/${categoryName}`
    );

    if (res.status === 200) {
      category.value = res.data;
      // console.log(res.data);
    }
  } catch (err) {
    console.log("Failed to get category detail", err.message);
  }
};
const handleDeploy = async () => {
  try {
    const categoryName = route.params.name;
    const res = await axios.put(
      `${endpoint}/api/deployCategory/${categoryName}`
    );

    if (res.status === 200) {
      checkCategoryDeploy();
    }
  } catch (err) {
    console.error("Error setting category deploy property", err.message);
  }
};
const checkCategoryDeploy = async () => {
  try {
    const categoryName = route.params.name;
    const res = await axios.get(
      `${endpoint}/api/checkCategoryDeploy/${categoryName}`
    );

    if (res.status === 200) {
      isDeployed.value = res.data;
      if (!isDeployed.value) {
        text.value = "undeployed";
      } else {
        text.value = "deployed";
      }
      console.log("category deployed", res.data);
    }
  } catch (err) {
    console.error("Error checking category deploy property", err.message);
  }
};

const deleteCategory = async () => {
  try {
    const categoryName = route.params.category;
    const res = await axios.post(
      `${endpoint}/api/deleteCategory/${categoryName}`
    );

    if (res.status === 200) {
      console.log("category deleted", res.data);
      router.push("/");
    }
  } catch (err) {
    console.error("Error deleting category", err.message);
  }
};
const showForm = () => {
  isFormVisible.value = true;

  categoryToUpdate.name = category.value.name;
  categoryToUpdate.category = category.value.category;
  categoryToUpdate.description = category.value.description;
  categoryToUpdate.tags = category.value.tags;
  categoryToUpdate.productImageURL = category.value.productImageURL;
};

const removeForm = () => {
  isFormVisible.value = false;
};

onMounted(() => {
  getCategoryDetail();
  checkCategoryDeploy();
});
</script>

<style scoped>
.header {
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
.header button {
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

.mainImage {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.549);
  width: 400px;
  height: auto;
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
}

.mainImage img {
  position: relative;
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
  font-size: 30px;
  font-weight: bolder;
  cursor: pointer;
  color: white;
}

.tags {
  position: relative;
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;
  text-align: center;
}

.tag {
  color: #ffff;
  font-size: 13px;
  padding: 0.1rem 0px;
  width: 20%;
  border-radius: 30px;
  background-color: orangered;
}

.tags span {
  position: absolute;
  top: -4px;
  right: 2px;
  padding: 2px;
  color: #ffff;
  cursor: pointer;
}
</style>
