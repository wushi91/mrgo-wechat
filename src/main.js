import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from '@/App'
import store from '@/store'
import ajaxs from '@/utils/net';//导入封装好的net
Vue.prototype.$ajaxs=ajaxs;//微信小程序网络请求的配置
Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false

const app = new Vue({
  mpType: 'app',
  store,
  ...App
})
app.$mount()
