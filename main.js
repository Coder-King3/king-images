import { createApp } from '~/package_modules/mini-vue'
import './src/assets/styles/index.less'
import App from './src/app.js'

const app = createApp(App)
app.mount('#root')
