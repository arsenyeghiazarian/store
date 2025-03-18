import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/CategoriesList.vue')
  },
  {
    path: '/category/:id',
    name: 'CategoryPage',
    component: () => import('@/views/CategoryPage.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import('@/views/ProductDetails.vue')
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: () => import('@/views/CartPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/PageNotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
