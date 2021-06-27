<template>
  <div class="home-container">
    <van-nav-bar
     class="page-nav-bar"
     fixed
    >
    <van-button slot="title" icon="search" class="search-button">搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab v-for="item in channel" :key="item.id" :title="item.name" >
        <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list.vue'
export default {
  name: 'HomePage',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      channel: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channel = data.data.channels
      // console.log(this.channel)
    }
  }
}
</script>

<style scoped lang='less'>
.home-container{
  padding-top:174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title{
    max-width: unset;
  }
  .search-button{
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon{
      font-size: 32px;
    }
  }
  /deep/.channel-tabs{
    .van-tabs__wrap{
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab{
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active{
      color: #333;
    }
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .van-tabs__line{
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder{
       flex-shrink: 0;
       width: 66px;
       height: 82px;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i .toutiao{
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
