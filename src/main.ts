import { createApp } from 'vue'
import router from './router'

// main
import App from './App.vue'

// css
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
