<template>
  <div class="search-container">
    <form class="search-form" action="/">
      <van-search
        v-model="value"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @focus="isResultShow=false"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :SearchText="value"/>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="value" :SearchText="value" @onSearch="onSearch"/>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history  v-else :searchHistories="searchHistories" @update-search-histories="searchHistories=[]" @search="onSearch"/>
    <!-- /搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      value: '',
      isResultShow: false,
      searchHistories: getItem('serach-histories') || []
    }
  },
  computed: {},
  watch: {
    searchHistories (val) {
    // 同步到本地存储
      setItem('serach-histories', val)
    }
  },
  created () {},
  methods: {
    onSearch (val) {
      this.value = val
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>
<style lang='less' scoped>
.van-search__action{
  color: #fff;
}
.search-container{
  padding-top: 108px;
}
.search-form{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
