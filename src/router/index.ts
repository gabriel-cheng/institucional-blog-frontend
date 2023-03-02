import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: (to, from ,next) => {
        const token = sessionStorage.getItem("token");

        if(!token) {
            return next('/auth/login')
        } else next();
      },
      component: () => import('../views/VerPostagens.vue')
    },
    {
      path: '/ver-postagens',
      name: 'Ver-postagens',
      beforeEnter: (to, from ,next) => {
        const token = sessionStorage.getItem("token");

        if(!token) {
            return next('/auth/login')
        } else next();
      },
      component: () => import('../views/VerPostagens.vue')
    },
    {
        path: "/auth/login",
        name: "login",
        component: () => import('../views/AuthLogin.vue')
    },
  ]
})

export default router
