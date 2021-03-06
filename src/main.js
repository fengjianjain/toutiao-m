import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'

import Vant from 'vant'
import './utils/dayjs'
import 'vant/lib/index.css'
// 动态设置rem值
import 'amfe-flexible'
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
