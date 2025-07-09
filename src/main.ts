import { createApp } from 'vue';

// module
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // pinia 持久化插件

// router
import router from '@/router/index.ts';

// plugins
import i18n from '@/plugins/i18n'; // 多國語系
import axios from '@/plugins/axios'; // call api

// pages
import App from './App.vue';

// pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// style
import '@/assets/scss/_reset.scss';
import '@/assets/scss/_window.scss';

createApp(App)
    .use(pinia)  // [必須] 使用pinia
    .use(router) // [必須] 使用vue-router
    .use(axios)  // [必須] 使用axios
    .use(i18n)   // [必須] 使用i18n 多國語系
    .mount('#app');
