<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
      <article-item v-for="(item,index) in list" :key="index" :article="item"></article-item>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null, // 请求下一页数据的时间戳
      isLoading: false,
      refreshSuccessText: '刷新成功！'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // console.log(data)
        // 2. 把数据添加到 list 数组中
        const { results } = data.data
        this.list.push(...results)

        // 3. 设置本次加载中 loading 状态结束
        this.loading = false

        // 4. 判断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (error) {
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.isLoading = false // 关闭下拉刷新的 loading 状态
        this.$toast('刷新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list{
  height: 79vh;
  overflow-y: auto;
}
</style>
