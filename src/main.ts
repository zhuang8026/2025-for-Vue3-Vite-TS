import { createApp } from 'vue';

// module
import { createPinia } from 'pinia';

// router
import router from '@/router/index.ts';

// plugins
import i18n from '@/plugins/i18n';
import axios from '@/plugins/axios';

// pages & style
import App from './App.vue';
import '@/assets/scss/_all.scss';

createApp(App)
    .use(createPinia()) // [必須] 使用pinia
    .use(router) // [必須] 使用vue-router
    .use(axios) // [必須] 使用axios
    .use(i18n) // [必須] 使用i18n 多國語系
    .mount('#app');
