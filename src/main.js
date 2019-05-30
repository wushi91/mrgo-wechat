import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from '@/App'
import store from '@/store'
import ajaxs from '@/utils/net';//导入封装好的net

import wxNavigate from '@/utils/wxNavigate'
import wxRequest from '@/utils/wxRequest'
import wxPromise from '@/utils/wxPromise'
import wxUrl from '@/utils/wxUrl'
import wxUtil from '@/utils/myUtils'
import wxAnalytics from '@/utils/wxAnalytics'
import wxConfig from '@/config/index'

Vue.prototype.$ajaxs=ajaxs;//微信小程序网络请求的配置
Vue.prototype.wxRequest =wxRequest
Vue.prototype.wxPromise =wxPromise
Vue.prototype.wxNavigate =wxNavigate
Vue.prototype.wxUtil =wxUtil

Vue.prototype.wxUrl =wxUrl
Vue.prototype.wxAnalytics =wxAnalytics
Vue.prototype.wxConfig =wxConfig

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false

const app = new Vue({
  mpType: 'app',
  store,
  ...App
})
app.$mount()
