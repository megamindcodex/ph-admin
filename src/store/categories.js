import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { endpoint } from "../constants/endpoint";

export const useCategoriesStore = defineStore("categoriesStore", {
  state: () => ({
    categories: ref([]),
    isFormVisible: ref(false),
    loading: null,
  }),
  getters: {
    categoriesLenght: (state) => state.categories.length,
  },
  actions: {
    async getAllCategories() {
      try {
        this.loading = true;
        const res = await axios.get(`${endpoint}/api/categories`);
        if (res.status === 200) {
          const data = res.data;
          this.categories = data;
          console.log(data);
        }
        this.loading = false;
      } catch (err) {
        console.log("Error getting Categories:", err.message);
      }
    },
    showForm() {
      this.isFormVisible = true;
    },
    removeForm() {
      this.isFormVisible = false;
    },
  },
});
