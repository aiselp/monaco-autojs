import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './userWorker';
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'

import './autox/service'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
