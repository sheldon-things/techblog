import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/index.vue';
// 这里可以导入其他页面组件
// import About from '../views/About.vue';
// import Contact from '../views/Contact.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/article.vue')
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/gallery.vue')
  },
  {
    path: '/paper',
    name: 'Paper',
    component: () => import('../views/paper.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;