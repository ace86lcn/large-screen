import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VCharts from 'v-charts'

// style
import '@/assets/scss/reset.scss'
// vue-cookies
import VueCookies from 'vue-cookies'

// request
import request from './utils/request'
import request2 from './utils/request2'

import './plugins/element.js'
import echarts from 'echarts'
import 'echarts/map/js/china.js';
import message from '@/utils/validate'
Vue.prototype.$msg = message


Vue.prototype.$echarts = echarts

Vue.prototype.$http = request
Vue.prototype.$http2 = request2

Vue.prototype.domain = process.env.VUE_APP_API_URL
Vue.prototype.domain2 = 'http://pinming.hzjyun.com'

Vue.use(VueCookies)
Vue.use(VCharts)

Vue.component('Pages', () => import('@/components/Pages'))

Vue.config.productionTip = false

request2.get('/index/index/projectList', {})
.then(res => {
	if(res.data.code === 200) {
		VueCookies.set('BigprojectList', JSON.stringify(res.data.data))
	}
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
