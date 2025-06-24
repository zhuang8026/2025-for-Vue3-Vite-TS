import { createRouter, createWebHistory } from 'vue-router';

import routes from '@/router/routes.ts';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 模擬是否登入（未來可改用 pinia 或 vuex）
const isLoggedIn = (): boolean => {
    return !!localStorage.getItem('token');
};
// function isLoggedIn(): boolean {
//     return !!localStorage.getItem('token')
// }

// 路由守衛
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()) {
        next('/login');
    } else {
        next();
    }
});

export default router;
