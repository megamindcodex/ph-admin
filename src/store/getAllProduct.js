import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { endpoint } from "../constants/endpoint";

export const useProductsStore = defineStore("productStore", {
  state: () => ({
    products: ref([]),
    isFormVisible: ref(false),
    loading: null,
  }),
  getters: {
    productsLenght: (state) => state.products.length,
  },
  actions: {
    async getAllProducts() {
      try {
        this.loading = true;
        const res = await axios.get(`${endpoint}/api/products`);
        if (res.status === 200) {
          const data = res.data;
          this.products = data;
          console.log(data);
        }
        this.loading = false;
      } catch (err) {
        console.log("Error getting Product:", err.message);
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
