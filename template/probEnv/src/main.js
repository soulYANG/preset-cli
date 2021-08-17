import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import qs from 'qs'
import moment from 'moment'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store'
import echarts from 'echarts'
import ECharts from 'vue-echarts'

// import style
import 'element-ui/lib/theme-chalk/index.css'
import animate from 'animate.css'
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.use(animate)
Vue.use(ElementUI)
Vue.component('v-chart', ECharts)
Vue.prototype.$qs = qs
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts
Vue.prototype.$bus = new Vue()

;(async () => {
  Vue.config.productionTip = false;
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
})();