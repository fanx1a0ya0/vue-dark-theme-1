import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import { mockXHR } from '../mock'
import './components'
import './styles/app.scss'

if (process.env.NODE_ENV === 'development') {
  mockXHR()
}

/**
 * Close the tip
 */
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
