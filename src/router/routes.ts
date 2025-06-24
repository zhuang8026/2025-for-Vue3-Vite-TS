import Login from '@/views/user/login/index.vue';
import Dashboard from '@/views/dashboard/index.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
    },
];

export default routes;
