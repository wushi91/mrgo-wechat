<template>
  <div class="test-wrapper">

    <div class="tere">
      <scrollcheck ref="scrollcheck1" viewId="scroll-id-1"></scrollcheck>
      <scrollcheck ref="scrollcheck2" viewId="scroll-id-2"></scrollcheck>
      <scrollcheck ref="scrollcheck3" viewId="scroll-id-3"></scrollcheck>

    </div>


    <div>
      <button @click="clickBtn" id="btn-id-1">scroll 4</button>
    </div>

    <div class="double-scroll">
      <scroll-view class="left-scroll-view" scroll-y :scroll-into-view="scrollViewId" scroll-with-animation>
        <div class="scroll-inner">
          <div v-for="(item,index) in goodList" :key="index" :id="'id'+index">
            {{item}}
          </div>
        </div>
      </scroll-view>

      <scroll-view class="right-scroll-view" scroll-y @scroll="onScroll">
        <div class="scroll-inner">
          <div v-for="(liebiao,liebiaoindex) in goodList2" :key="liebiaoindex">
            <div v-for="(good,index) in liebiao" :key="index">
              {{good}}
            </div>
            <div class="scroll-gook-mark"></div>
          </div>
        </div>

      </scroll-view>
    </div>


  </div>
</template>


<script>

  /*
  * 右边每滚动100px，左边下滑到下一个
  * */
  import scrollcheck from '@/components/scrollCheck'

  export default {
    config: {
      navigationBarTitleText: '测试',
    },
    data() {
      return {
        markItemHeight:[],
        scrollTop100: 0,
        showScroll2: true,
        scrollViewId: 'id0',
        goodList: ['分类1','分类2','分类3','分类4','分类5','分类6','分类7','分类8','分类9','分类2','分类3','分类4','分类5','分类6','分类7','分类8','分类9','分类2','分类3','分类4','分类5','分类6','分类7','分类8','分类9','分类2','分类3','分类4','分类5','分类6','分类7','分类8','分类9','分类2','分类3','分类4','分类5','分类6','分类7','分类8','分类9'],
//        goodList2: ['adf', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet', 'fefe', 'ewrwer','erw','dsfsdfet'],
        goodList2: [['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'],['鱼', '蔬菜'], ['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'],['鱼', '蔬菜'],['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'],['鱼', '蔬菜'],['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'], ['苹果', '李子', '西瓜', '香蕉'], ['馒头', '油条', '豆浆'],['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'], ['苹果', '李子', '西瓜', '香蕉'], ['馒头', '油条', '豆浆'],['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'], ['苹果', '李子', '西瓜', '香蕉'], ['馒头', '油条', '豆浆'], ['鱼', '蔬菜'], ['绿豆', '红豆', '黑豆', '大豆', '黄豆', '赤豆', '白豆']]
      };
    },
    computed: {},


    onLoad() {
      console.log('this.wxUtil.rpx2px(10)')
      console.log(this.wxUtil.rpx2px(500))

      this.scrollTop100 = this.wxUtil.rpx2px(250)
    },
    components: {
      scrollcheck
    },
    mounted() {
      console.log(this.$refs.scrollcheck)

      this.jisuanHeight()
//        const query = wx.createSelectorQuery()
//        query.select('#scroll-id-3').boundingClientRect()
//        query.selectViewport().scrollOffset()
//        query.exec(function (res) {
//          console.log('scroll-id-3 res', res)
//          res[0].top // #the-id节点的上边界坐标
//          res[1].scrollTop // 显示区域的竖直滚动位置
//        })
    },


    methods: {

      jisuanHeight() {
        const query = wx.createSelectorQuery()
        query.selectAll('.right-scroll-view .scroll-gook-mark').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res)=> {
          console.log('scroll-gook-mark res', res)
//          res[0].top // #the-id节点的上边界坐标
//          res[1].scrollTop // 显示区域的竖直滚动位置

          let markItemHeight =[]
          for(let i=0;i<res[0].length;i++){
//            console.log(res[0][i])
            markItemHeight.push(res[0][i].top-137)
          }

          this.markItemHeight = markItemHeight
          console.log(markItemHeight)
        })


      },

      onScroll(e) {
        console.log(e.mp.detail)

        //判断滚动的区间，是否处于markItemHeight的值

        let scrollTop = e.mp.detail.scrollTop

        //优化，如果scrollTop已经高于了，即到底部了，不要处理了
        if(scrollTop>e.mp.detail.scrollHeight-276){
          return
        }

        console.log('scrollTop',scrollTop)
        console.log('this.markItemHeight[0]',this.markItemHeight[0])
        let ii = 0
        for(let i=0;i<this.markItemHeight.length;i++){
          if(scrollTop<this.markItemHeight[i]){
            //还在区间范围内
            ii = i
            break
          }
        }

        console.log('iiiii',ii)
//        let ii = parseInt(e.mp.detail.scrollTop / this.scrollTop100)
//        this.scrollViewId = 'id'+ii
//        console.log()




        let scrollViewId = 'id' + ii
        if (scrollViewId !== this.scrollViewId) {
          console.log('--fe-fe--fee ' + scrollViewId)
          this.scrollViewId = scrollViewId
        }

//        this.scrollViewId = 'id16'

//        if(e.mp.detail.scrollTop)

      },
      clickBtn() {
        if (this.scrollViewId === 'id16') {
          this.scrollViewId = 'id6'
        } else {
          this.scrollViewId = 'id16'
        }


//        this.$refs.scrollcheck2.checkUser()

//
//        const query = wx.createSelectorQuery()
//        query.select('#scroll-id-3').boundingClientRect()
//        query.selectViewport().scrollOffset()
//        query.exec(function (res) {
//          console.log('scroll-id-3 res', res)
//          res[0].top // #the-id节点的上边界坐标
//          res[1].scrollTop // 显示区域的竖直滚动位置
//        })
//
//
//        console.log('clickbtn')
//        this.showScroll2 = false
      },


    }
  };

</script>


<style>
  page, test-wrapper {
    max-height: 100%;
  }
</style>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .test-wrapper {
    display: flex;
    background-color: #EEEEEE;
    flex-direction: column;

    #btn-id-1 {
      margin: rpx(10);
    }

    .tere {
      display: flex;
      flex-direction: column;
    }

  }

  .double-scroll {
    display: flex;

    font-size: rpx(36);

    .left-scroll-view {
      width: rpx(150);
      background-color: red;
      height: rpx(500);
    }
    .right-scroll-view {
      background-color: lightblue;
      height: rpx(500);
    }
  }


</style>
