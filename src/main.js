import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from '@/App'
import store from '@/store'
import ajaxs from '@/utils/net';//导入封装好的net

import wxRequest from '@/utils/wxRequest'
import wxPromise from '@/utils/wxPromise'
import wxUrl from '@/utils/wxUrl'

Vue.prototype.$ajaxs=ajaxs;//微信小程序网络请求的配置
Vue.prototype.wxRequest =wxRequest
Vue.prototype.wxPromise =wxPromise
Vue.prototype.wxUrl =wxUrl

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false

const app = new Vue({
  mpType: 'app',
  store,
  ...App
})
app.$mount()
