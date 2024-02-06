import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { endpoint } from "@/constants/endpoint";

export const useUsersStore = defineStore("usersStore", {
  setup: () => ({
    users: ref([]),
  }),
  actions: {
    async getAllUsers() {
      try {
        const res = await axios.get(`${endpoint}/api/allUsers`);
        if (res.status === 200) {
          this.users = res.data;
          // console.log(users.value)
        } else {
          console.error("Unexpected status code:", res.status);
        }
      } catch (err) {
        console.error("Error getting all users", err);
      }
    },
  },
});
