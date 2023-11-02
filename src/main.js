import './assets/styles/css/global.css'
import './assets/styles/css/reset.css'
import './assets/styles/scss/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";


const app = createApp(App)
app
    .use(router)
    .mount('#app')
