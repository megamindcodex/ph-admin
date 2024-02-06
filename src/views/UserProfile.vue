<template>
  <h1>User Profile Page</h1>

  <div class="cont">
    <div class="userCont" v-if="user">
      <p>{{ user.userName }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.password }}</p>
      <p>Verified: {{ user.verified }}</p>
      <p>Logged in: {{ user.login }}</p>
    </div>

    <div class="form">
      <div class="form-group">
        <label>
          subject:
          <input type="text" v-model="subject" />
        </label>
      </div>
      <div class="form-group">
        <label>
          message:
          <textarea name="" id="" v-model="Msg"></textarea>
        </label>
      </div>
      <div class="btn">
        <button @click="sendEmailMessage">send</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {},
      subject: null,
      Msg: null,
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      try {
        const userId = this.$route.params.id;
        const res = await axios.get(
          `https://cute-lime-cocoon-hat.cyclic.app/api/user/${userId}`
        );

        if (res.status === 200) {
          this.user = res.data;
          console.log("user data fetched:", this.user);
        }
      } catch (err) {
        console.error("Error getting user data:", err.message);
      }
    },
    async sendEmailMessage() {
      try {
        const formData = {
          subject: this.subject,
          msg: this.Msg,
          userName: this.user.userName,
          email: this.user.email,
        };
        const res = await axios.post(
          "https://cute-lime-cocoon-hat.cyclic.app/api/sendEmail",
          formData
        );

        if (res.status === 200) {
          alert("email message sent");
          console.log("email message sent:", res.data);
        }
      } catch (err) {
        console.error("Error sending email message:", err.message);
      }
    },
  },
};
</script>

<style></style>
