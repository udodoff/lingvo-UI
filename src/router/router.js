import Login from '../pages/Login.vue'
import MainPage from '../pages/MainPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/main',
        component: MainPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})
router.beforeEach((to, from, next) => {
    if (to.fullPath !== '/' && !store.state.isAuth) next('/')
    else next()
  }) 

export default router