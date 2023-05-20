import Login from '../pages/Login.vue'
import MainPage from '../pages/MainPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

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

export default router