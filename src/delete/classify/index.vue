<template>
  <div class="page">
    <saerchindex/>
    <div class="page_body">
      <div class="page_body_left">
        <ul class="page_ul"  >
          <li class="page_ul_li" :class="avtive!=index||'active'" v-for="(item, index) in types" @click="rowClick(index)" :key="index">
            <span class="activespan" v-if="avtive==index"></span>
            <span class="page_ul_li_size">{{item.name}}</span>
            </li>
        </ul>
      </div>
      <div class="page_body_right" v-if="typeslist.length>0">
        <div v-for="(item, index) in typeslist"
            class="centre_page_cards"
            :key="index">
            <div @click="cardUrl(item)" class="backround_img" :style="'background: url('+item.imageUrl+') no-repeat center center;background-size: cover;'">
              <div class="backround_img_name">
                {{item.name}}
              </div>
            </div>
        </div>
      </div>
       <div class="centre_page_cards_new"    v-else>
         <div class="noimgs" style="background: url('../../../static/tabs/15.png') no-repeat center center;background-size: cover;"></div>
       </div>
    </div>
  </div>
</template>

<script>
// import saerchindex from "@/components/search";
// import { selectOption } from "@/utils/selectOption";
export default {
  config: {
        navigationBarTitleText: '分类',
        enablePullDownRefresh:true
    },
  data() {
    return {
      avtive:0,
      types:[],
      typeslist:[]
    };
  },
  // 下拉刷新方法，与methods方法同级

  async onPullDownRefresh() {
  // to doing..
    this.lodingtop()
  // 停止下拉刷新

  },
  components: {
    // saerchindex
  },
  mounted() {
    // this.getselectOption()
  },
  methods: {
    lodingtop(){
      console.log('下拉刷新')
      if(this.avtive==0){
        // this.getselectOption()
      }else{
        this.avtive--
        var sty=this.types[this.avtive].value
        this.getPackageByHospitalIdAndType(sty)
      }
       
      wx.stopPullDownRefresh();
    },
    

    cardUrl(item) {
      this.$router.push({
        path: "../classify/calssifyList",
        query: item 
      });
    }
  }
};
</script>

<style scoped>
.page {
  position: fixed;
  height: 100%;
  width: 100%;
}
.centre_page_cards {
  margin-top: 10px;
}
.centre_page_cards_new{
  margin-top: 50px;
  width: 100%;
}
.page_body {
  position: fixed;
  height: 94%;
  width: 100%;
  display: flex;
  border-top: 1px solid #DDD;
}
.active{
  color:rgba(250,77,147,1)!important;

}
.activespan{
  position: absolute;
  top :8px;
  bottom: 8px;
  left: 0;
  height: 25px;
  width: 4px;
  background:rgba(250,77,147,1);
  border-radius:2px;
}
.page_ul .page_ul_li{
  display: block;
  position:relative;
  font-weight:500;
  height: 30px;
  display:flex;
  padding: 5px 0;
  background:#fff;
  align-items:center;
  line-height:30px;
  font-size:14px;
  overflow:hidden;
  color: #000;
}

.page_ul .page_ul_li + .page_ul_li{
  /* border-top:1px solid #DDD; */
}
.page_body_left {
  flex: 0 0 81px;
  border-right: 1px solid #DDD;
  overflow: auto;
  padding-bottom: 10px;
}
.page_body_right {
  flex: 1;
  overflow: auto;
  padding-bottom: 50px;
}
.backround_img{
 
  border-radius:2px;
  height: 98px;
  position: relative;
  margin: 16px 14px 0 14px;
}
.backround_img_name{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background:rgba(255,255,255,.7);
  border-radius:0px 0px 2px 2px;
  height: 25px;
  color:rgba(102,102,102,1);
  line-height: 25px;
  font-size:12px;
  width: 100%;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  padding-left: 5px;
}
.page_ul_li_size{
  display: inline-block;
  margin-left: 14px;
}
.page_body_tops{
    height: 44px;
    line-height: 44px;
    display: flex;
     
    background:rgba(248,248,248,1);
}
.noimgs{
   width: 93px; 
   height: 128px;
   margin: 0 auto;
}
.shopspt{
  flex: 0 0 40px;
}
.hospt_div{
  width: 100px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  color: #000;
  font-size: 14px;
  font-weight:500;
  padding-left: 14px;
}
.hospt{
   flex: 1;
   
}
.shopspt_img{
  width: 24px;
  height: 24px;
  margin-top: 11px;
}
</style>

