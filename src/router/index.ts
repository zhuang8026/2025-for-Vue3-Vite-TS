import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 模擬是否登入（未來可改用 pinia 或 vuex）
const isLoggedIn = (): boolean => {
    return !!localStorage.getItem('token')
}
// function isLoggedIn(): boolean {
//     return !!localStorage.getItem('token')
// }

// 路由守衛
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()) {
        next('/login')
    } else {
        next()
    }
})

export default router
