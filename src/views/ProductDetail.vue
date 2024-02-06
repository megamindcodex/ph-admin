<template>
  <div class="cont">
    <div class="product" v-if="product">
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
        <img :src="product.productImageURL" :alt="product.name" />
      </div>
      <div class="desc">
        <h3>{{ product.name }}</h3>
        <p>${{ product.price }}</p>
      </div>
      <div class="delete">
        <button @click="deleteProduct">delete</button>
      </div>
    </div>

    <Backlay v-if="isFormVisible">
      <div class="form">
        <span class="closeBtn" @click="removeForm">X</span>
        <div class="form-group">
          <label>Product name:</label>
          <input type="text" v-model="productToUpdate.name" />
        </div>

        <div class="form-group">
          <label>Product price:</label>
          <input type="Number" v-model="productToUpdate.price" />
        </div>

        <div class="form-group">
          <label>insert image URL</label>
          <input
            type="text"
            v-model="productToUpdate.productImageURL"
            @input="getImage"
          />
        </div>

        <div class="form-group">
          <div class="imgCont">
            <div class="image">
              <img :src="productToUpdate.productImageURL" alt="image here..." />
            </div>
          </div>
        </div>
        <div class="btn">
          <button @click="updateProduct">update product</button>
        </div>
      </div>
    </Backlay>
  </div>
</template>


<script>
import axios from "axios";
import Backlay from "@/components/Backlay.vue";
import { endpoint } from "../constants/endpoint";
export default {
  components: {
    Backlay,
  },
  data() {
    return {
      endpoint: endpoint,
      product: {},
      deployed: false,
      isDeployed: false,
      text: "",
      isFormVisible: false,
      productToUpdate: {
        name: "",
        price: null,
        productImageURL: "",
      },
    };
  },
  mounted() {
    this.getProductDetail();
    this.checkDeploy();
  },
  methods: {
    async getProductDetail() {
      try {
        const productId = this.$route.params.id;
        const res = await axios.get(
          `${endpoint}/api/productDetail/${productId}`
        );

        if (res.status === 200) {
          this.product = res.data;
          // console.log(res.data)
        }
      } catch (err) {
        console.log("Failed to get product detail", err.message);
      }
    },
    async handleDeploy() {
      try {
        const productId = this.$route.params.id;
        const res = await axios.put(
          `${endpoint}/api/deployProduct/${productId}`
        );

        if (res.status === 200) {
          this.deployed = res.data;
          this.checkDeploy();
          // console.log("product deployed", res.data)
        }
      } catch (err) {
        console.error("Error setting product deploy property");
      }
    },
    async checkDeploy() {
      try {
        const productId = this.$route.params.id;
        const res = await axios.get(`${endpoint}/api/checkDeploy/${productId}`);

        if (res.status === 200) {
          this.isDeployed = res.data;
          if (!this.isDeployed) {
            this.text = "undeployed";
          } else {
            this.text = "deployed";
          }
          console.log("product deployed", res.data);
        }
      } catch (err) {
        console.error("Error checking product deploy property");
      }
    },
    async deleteProduct() {
      try {
        const productId = this.$route.params.id;
        const res = await axios.post(
          `${endpoint}/api/deleteProduct/${productId}`
        );

        if (res.status === 200) {
          console.log("product deleted", res.data);
          this.$router.push("/");
        }
      } catch (err) {
        console.error("Error deleting product", err.message);
      }
    },
    showForm() {
      this.isFormVisible = true;

      this.productToUpdate = {
        name: this.product.name,
        price: this.product.price,
        productImageURL: this.product.productImageURL,
      };
    },
    removeForm() {
      this.isFormVisible = false;
    },
    async updateProduct() {
      try {
        const productId = this.$route.params.id;
        const res = await axios.put(
          `${endpoint}/api/updateProduct/${productId}`,
          this.productToUpdate
        );
        if (res.status === 200) {
          this.product = res.data;
          console.log("product updated", res.data);
          this.removeForm();
        }
        //   this.isForm

        console.log(res.data);
      } catch (err) {
        console.log("Fialed to Update product content", err.message);
      }
    },
  },
};
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

.form {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 400px;
  background-color: rgb(202, 218, 218);
  margin-top: 5rem;
  padding: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
}

input[type="text"] {
  margin-top: 1rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 2.7px;
  border: none;
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

.closeBtn {
  position: absolute;
  top: 14.7%;
  right: 20%;
  font-size: 30px;
  font-weight: bolder;
  cursor: pointer;
  color: white;
}
</style>
