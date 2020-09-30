import { createApp } from 'vue'
// import Axios from 'axios'
import App from './App.vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import router from './router'
import store from './store'
// import Moment from 'vue-moment'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Chartkick.use(Chart))
// app.use(Moment)

// app.config.globalProperties.$http = Axios
// const token = localStorage.getItem('Authorization')
// if (token) {
//   app.config.globalProperties.$http.defaults.headers.common[
//     'x-auth-token'
//   ] = token
// }

app.mount('#app')
