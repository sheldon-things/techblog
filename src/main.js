import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 导入路由实例
import './assets/main.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router) // 使用路由
app.mount('#app')
