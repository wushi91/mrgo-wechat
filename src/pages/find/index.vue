<template>
  <div>
    <p class="card">
      <saerchindex/>
      <i-button type="primary" @click="getLocations">这是一个按钮</i-button>
    </p>
  </div>
</template>

<script>
import saerchindex from '@/components/search'
export default {
  config: {
        navigationBarTitleText: '发现'
    },
  data() {
    return {};
  },
  components: {
    saerchindex
  },
  methods: {
    handleClick() {
      console.log("123");
      const url = "/packageA/logs";
      this.$router.push(url);
    },
    count(){},
    getLocations(){
      let _this = this
      wx.getSetting({
        success(res) {
          // debugger
          // 判断用户是否授权过，
          // 未授权过、
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success(res) {
                // 用户允许 查看自己的位置
                console.log(res);
                _this.wxGetLocation()
              },
              fail(err) {
                console.log(err);
                // 当用户拒绝 查看自己的位置的时候  统计数据
                // 统计数据  地理位置为空
                _this.count();
              }
            })
          } else {
            // 授权过
            _this.wxGetLocation();
          }
        },
        fail(err) {
          console.log(err)
        }
      });
    },
    wxGetLocation(){
      let _this = this;
      wx.getLocation({
        // type: 'wgs84',
        success: function (res) {
          let latitude,longitude;
          latitude = res.latitude.toString();
          longitude = res.longitude.toString();
          console.log(latitude,longitude)
          // wx.request({
          //   header:{
          //     "Content-Type": "application/text"
          //   },
          //   url:'http://apis.map.qq.com/ws/geocoder/v1/?location='+latitude+','+longitude+'&key=MVGBZ-R2U3U-W5CVY-2PQID-AT4VZ-PDF35',
          //   success: function(res) {
          //     _this.country = res.data.result.address_component.nation
          //     _this.province =res.data.result.address_component.province
          //     _this.city = res.data.result.address_component.city
          //     _this.district = res.data.result.address_component.district
          //     //_this.count();
          //     // console.log(res.data.result.address_component.nation,res.data.result.address_component.province,res.data.result.address_component.city,res.data.result.address_component.district)
          //   }
          // });
        },
        fail: function(err) {
          console.log(err);
          console.log(112)
        }
      });
    }
  }
};
</script>

<style>
.card {
  padding: 10px;
}
</style>