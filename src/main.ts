import { createApp } from 'vue';

// router
import router from '@/router/index.ts';

// i18n
import i18n from '@/plugins/i18n';

// module
import axios from 'axios';
import { createPinia } from 'pinia';

// pages & style
import App from './App.vue';
import './style.css';

createApp(App)
    .use(createPinia()) // [必須] 使用pinia
    .use(router) // [必須] 使用vue-router
    .use(axios) // [必須] 使用axios
    .use(i18n) // [必須] 使用i18n 多國語系
    .mount('#app');
