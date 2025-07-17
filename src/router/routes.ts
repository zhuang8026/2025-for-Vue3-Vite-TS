import Login from '@/views/user/login/index.vue';

import Training from '@/views/training/index.vue';
import Tracking from '@/views/tracking/index.vue';
import Settings from '@/views/user/settings/index.vue';

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
        path: '/training',
        name: 'Training',
        component: Training,
        meta: {
            requiresAuth: true,
            layout: 'default', // header, footer, nav
        },
    },
    {
        path: '/tracking',
        name: 'Tracking',
        component: Tracking,
        meta: {
            requiresAuth: true,
            layout: 'default', // header, footer, nav
        },
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            requiresAuth: true,
            layout: 'default', // header, footer, nav
        },
    },
];

export default routes;
