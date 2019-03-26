<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-search-bar">
        <div class="weui-search-bar__cancel-btn search-widct-btn" > <i-icon type="coordinates" size="20" color="#80848f" />{{dizhi}}</div>
        <div style="width:10px"></div>
        <div class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
            <input type="text" class="weui-search-bar__input" placeholder="搜索" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
            <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
              <icon type="clear" size="14"></icon>
            </div>
          </div>
          <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
            <icon class="weui-icon-search" type="search" size="14"></icon>
            <div class="weui-search-bar__text">搜索</div>
          </label>
        </div>
        <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
      </div>
      <!-- <div class="weui-cells searchbar-result" v-if="inputVal.length > 0">
        <div class="weui-cell__bd" v-for="(item, index) in 6" :key="index" @click="searchbarclick(item)">
            <div>实时搜索文本</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import '@/css/weui.css'
export default {
  data() {
    return {
      inputShowed: false,
      inputVal: "",
      dizhi:'选择医院'
    }
  },
  watch: {
    inputVal(old,news){
      this.$emit("input", old);
    }
  },
  methods: {
    showInput() {
      this.inputShowed = true;
    },
    hideInput() {
      this.inputVal = '';
      this.inputShowed = false
    },
    clearInput() {
      this.inputVal = '';
      
    },
    searchbarclick(e){
      console.log(e)
      this.dizhi=e
      this.inputVal = '';
      this.inputShowed = false
    },
    inputTyping(e) {
      console.log(e);
      this.inputVal = e.mp.detail.value
    }
  }
}
</script>
<style scoped>
.searchbar-result {
  margin-top: 0;
  font-size: 14px;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}
.search-widct-btn{
    font-size: 14px;
    width: 80px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
</style>