<template>
  <h1>All Users Page</h1>

  <div class="cont">
    <div class="usersCont" v-if="usersStore.users">
      <div class="userDiv" v-for="user in usersStore.users" :key="user._id">
        <div class="userDetails">
          <div class="row">
            <div class="col">
              <p>{{ user.userName }}</p>
              <p>{{ user.email }}</p>
              <p>{{ user.password }}</p>
              <!-- <p>{{ user.userCart.cartItems }}</p> -->
              <!-- {{ user._id }} -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>verified: {{ user.verified }}</span>
          </div>
          <RouterLink :to="'/manageUsers/user/' + user._id" class="col"
            ><button>More</button>
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>No users</h1>
    </div>
  </div>
</template>

<script setup>
import { useUsersStore } from "../store/getAllUser";
const usersStore = useUsersStore();

usersStore.getAllUsers();
</script> 
  

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.cont {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.usersCont {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.userDiv {
  display: flex;
  row-gap: 0.6rem;
  flex-direction: column;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 1rem;
  width: 100%;
  max-width: 800px;
  height: auto;
}

.userDetails {
  display: flex;
  width: 100%;
  /* background: teal; */
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 5px; */
}

.col {
  display: flex;
  flex-direction: column;
  text-decoration: none;
}

button {
  /* background-color: #4caf50; */
  color: black;
  border: 1px solid #4caf50;
  padding: 0.7rem 1rem;
  font-size: 0.9em;
  cursor: pointer;
}

button:hover {
  background-color: #b1d2b2;
  border-color: transparent;
  color: white;
}
</style>
