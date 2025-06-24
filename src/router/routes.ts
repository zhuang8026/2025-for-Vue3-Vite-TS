import Login from '@/views/user/login/index.vue';
import Dashboard from '@/views/dashboard/index.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            layout: 'auth',
        },
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
            layout: 'default', // header, footer, nav
        },
    },
];

export default routes;
