import { createRouter, createWebHistory } from 'vue-router'


import ManageProduct from '../views/ManageProduct.vue'
import Sitesetting from '../views/Sitesetting.vue'
import Account from '../views/Account.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ManageUsers from '../views/ManageUsers.vue'
import UserProfile from '../views/UserProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ManageProduct',
      component: ManageProduct
    },  
    {
      path: '/sitesetting',
      name: 'Sitesetting',
      component: Sitesetting
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/productDetail/:id',
      name: 'ProducDetail',
      component: ProductDetail
    },
    {
      path: '/manageUsers',
      name: 'ManageUsers',
      component: ManageUsers
    },
    {
      path: '/manageUsers/user/:id',
      name: 'userProfile',
      component: UserProfile
    },
  ]
})

export default router
