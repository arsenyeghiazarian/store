import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('@/views/CatalogView.vue');

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: 'Home', keepAlive: true } },
  {
    path: '/category/:id',
    name: 'CategoryPage',
    component: () => import('@/views/CategoryPageView.vue'),
    meta: { title: 'Category', keepAlive: true },
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import('@/views/ProductDetailsView.vue'),
    meta: { title: 'Product Details', keepAlive: false },
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: () => import('@/views/CartPageView.vue'),
    meta: { title: 'Shopping Cart', keepAlive: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/PageNotFoundView.vue'),
    meta: { title: 'Page Not Found', keepAlive: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Store` : 'Store';
  next();
});

export default router;
