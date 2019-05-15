<template>
  <div class="online-store">

    <div>fefef</div>
    <!---->
    <div class="double-scroll" :style="'height: '+scrollViewHeight+'px'">
      <!--scroll-with-animation-->
      <scroll-view class="left-scroll-view" scroll-y :scroll-into-view="scrollViewId" >
        <div class="scroll-inner">
          <div class="good-type-item" v-for="(item,index) in goodList" :key="index" :id="'id'+index" :class="scrollViewId==='id'+index?'good-type-item select':'good-type-item'">
            {{item}}{{index + 1}}
          </div>
        </div>
      </scroll-view>

      <scroll-view class="right-scroll-view" scroll-y @scroll="onScroll">
        <div class="scroll-inner">
          <div v-for="(liebiao,liebiaoindex) in goodList2" :key="liebiaoindex" :class='liebiaoindex%2===0?"even":"odd"'>
            <div class="good-info-item" v-for="(good,index) in liebiao" :key="index">
              <image></image>
              {{good}}{{liebiaoindex + 1}}
            </div>
            <div class="scroll-gook-mark"></div>
          </div>
        </div>

      </scroll-view>
    </div>
  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import mytabbar from '@/templates/myTabBar'

  export default {
    config: {
      navigationBarTitleText: '在线购物',

    },

    components: {
      mytabbar
    },
    data() {
      return {
        scrollViewId: 'id0',
        scrollViewHeight: 0,
        topHeight: 0,
        windowHeight: 0,
        goodList: ['分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类', '分类',],
        goodList2: [['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'], ['鱼', '蔬菜'], ['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'], ['鱼', '蔬菜'], ['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'], ['鱼', '蔬菜'], ['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'], ['苹果', '李子', '西瓜', '香蕉'], ['馒头', '油条', '豆浆'], ['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'], ['苹果', '李子', '西瓜', '香蕉'], ['馒头', '油条', '豆浆'], ['可口可乐', '百事可乐', '伊利', '冰红茶', '农夫山泉', '加多宝', '红牛'], ['苹果', '李子', '西瓜', '香蕉'], ['馒头', '油条', '豆浆'], ['鱼', '蔬菜'], ['绿豆', '红豆', '黑豆', '大豆', '黄豆', '赤豆', '白豆']]
      };
    },

    onLoad() {
      this.windowHeight = wx.getSystemInfoSync().windowHeight
      this.initScrollView()

    },
    mounted() {
      this.initScrollMarkHeight('.right-scroll-view .scroll-gook-mark')
    },

    methods: {

      initScrollView() {
        const query = wx.createSelectorQuery()
        query.select('.double-scroll').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res) => {
          this.topHeight = res[0].top
          this.scrollViewHeight = this.windowHeight - this.topHeight
        })
      },

      initScrollMarkHeight(selector) {
        const query = wx.createSelectorQuery()
        query.selectAll(selector).boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res) => {
          console.log('scroll-gook-mark res', res)//          res[0].top // #the-id节点的上边界坐标//          res[1].scrollTop // 显示区域的竖直滚动位置
          let markItemHeight = []
          for (let i = 0; i < res[0].length; i++) {
            markItemHeight.push(res[0][i].top - this.topHeight)
          }
          this.markItemHeight = markItemHeight
//          console.log(markItemHeight)
        })
      },

      onScroll(e) {
        console.log(e.mp.detail)

        //判断滚动的区间，是否处于markItemHeight的值

        let scrollTop = e.mp.detail.scrollTop

        //优化，如果scrollTop已经高于了，即到底部了，不要处理了
        if (scrollTop > e.mp.detail.scrollHeight - 276) {
          return
        }

//        console.log('scrollTop', scrollTop)
        console.log('this.markItemHeight[0]', this.markItemHeight[0])
        let ii = 0
        for (let i = 0; i < this.markItemHeight.length; i++) {
          if (scrollTop < this.markItemHeight[i]) {
            //还在区间范围内
            ii = i
            break
          }
        }

//        console.log('iiiii', ii)
//        let ii = parseInt(e.mp.detail.scrollTop / this.scrollTop100)
//        this.scrollViewId = 'id'+ii
//        console.log()


        let scrollViewId = 'id' + ii
        if (scrollViewId !== this.scrollViewId) {
//          console.log('--fe-fe--fee ' + scrollViewId)
          this.scrollViewId = scrollViewId
        }

//        this.scrollViewId = 'id16'

//        if(e.mp.detail.scrollTop)

      },

    }
  };
</script>


<style>
  page {
    /*background-color: #FFFFFF;*/
    /*background-color: red;*/
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
</style>
<style lang="scss" scoped>
  @import "../../common/scss/base";

  .online-store {
    display: flex;
    flex-direction: column;
    .double-scroll {
      background-color: #e6e6ea;
      border-bottom: rpx(14) solid black;
      box-sizing: border-box;
      display: flex;

      scroll-view {
        height: 100%;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
          color: transparent;
        }
      }

      .left-scroll-view {
        width: rpx(188);
        background-color: #F6F6F6;
        .scroll-inner {
          .good-type-item {
            display: flex;
            justify-content: center;
            align-items: center;
            @include FCS(#666666, 32, 108, 108);
            &.select{
              background-color: white;
              color:#37D0B3;
            }
          }
        }
      }
      .right-scroll-view {
        background-color: #cecece;
        .scroll-inner {
          .even {
            background-color: #cecece;
          }
          .odd {
            background-color: #e6e6ea;
          }

          .good-info-item {
            display: flex;
            padding: rpx(40) rpx(25);
            border-bottom: rpx(2) solid seagreen;
            image {
              @include WH(136, 136);
              background-color: #9b9b9b;
              margin-right: rpx(10);
            }

          }
        }
      }
    }
  }

</style>
