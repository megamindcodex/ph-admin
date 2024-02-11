import { createRouter, createWebHistory } from "vue-router";

import ManageProduct from "../views/ManageProduct.vue";
import Cartegories from "../views/Cartegories.vue";
import CategoryDetail from "../views/CategoryDetail.vue";
import Sitesetting from "../views/Sitesetting.vue";
import Account from "../views/Account.vue";
import ProductDetail from "../views/ProductDetail.vue";
import ManageUsers from "../views/ManageUsers.vue";
import UserProfile from "../views/UserProfile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "products",
      component: ManageProduct,
    },
    {
      path: "/categories",
      name: "categories",
      component: Cartegories,
    },
    {
      path: "/categoryDetail/:name",
      name: "categoryDetail",
      component: CategoryDetail,
    },
    {
      path: "/sitesetting",
      name: "Sitesetting",
      component: Sitesetting,
    },
    {
      path: "/account",
      name: "account",
      component: Account,
    },
    {
      path: "/productDetail/:id",
      name: "ProducDetail",
      component: ProductDetail,
    },
    {
      path: "/manageUsers",
      name: "manageUsers",
      component: ManageUsers,
    },
    {
      path: "/manageUsers/user/:id",
      name: "userProfile",
      component: UserProfile,
    },
  ],
});

export default router;
