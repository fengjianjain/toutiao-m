<template>
  <div class="home-container">
    <van-nav-bar
     class="page-nav-bar"
     fixed
    >
    <van-button slot="title" icon="search" class="search-button" to="/search">搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab v-for="item in channel" :key="item.id" :title="item.name" >
        <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="show=true" >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup closeable close-icon-position="top-left" v-model="show" position="bottom" :style="{ height: '100%' } " >
      <channel-edit :myChannel="channel" :active="active" :active-index.sync="active" @close-poup="show=false"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channel: [],
      show: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      // const { data } = await getUserChannels()
      // this.channel = data.data.channels
      let channels = []
      try {
        if (this.user) {
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          const localChannels = getItem('channels')
          if (localChannels) {
            // 有本地频道数据，则使用
            channels = localChannels
          } else {
            // 没有本地频道数据，则请求获取默认推荐的频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channel = channels
      } catch (error) {
        this.$toast('数据获取失败')
      }
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
