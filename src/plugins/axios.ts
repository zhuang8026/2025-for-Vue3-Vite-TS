import axios from 'axios';
import type { App } from 'vue';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});

export default {
    install(app: App) {
        app.config.globalProperties.$axios = instance;
    },
};

export { instance as axios };
