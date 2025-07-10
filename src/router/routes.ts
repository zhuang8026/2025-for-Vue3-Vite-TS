import Login from '@/views/user/login/index.vue';

import Training from '@/views/training/index.vue';
import Device from '@/views/device/index.vue';
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
        path: '/',
        name: 'Training',
        component: Training,
        meta: {
            requiresAuth: true,
            layout: 'default', // header, footer, nav
        },
    },
    {
        path: '/device',
        name: 'Device',
        component: Device,
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
