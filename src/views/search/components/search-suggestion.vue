<template>
  <div class="search-suggestion">
    <van-cell
    icon="search"
    v-for="(item,index) in suggestions"
    :key="index"
    @click="$emit('onSearch',item)"
    >
    <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    SearchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {
  },
  watch: {
    SearchText: {
      handler: debounce(function (val) {
        this.loadSearchSuggestions(val)
      }, 200),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败！')
      }
    },
    highlight (text) {
      const highlight = `<span class="active">${this.SearchText}</span>`
      const reg = new RegExp(this.SearchText, 'gi')
      return text.replace(reg, highlight)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion{
  /deep/.active{
    color: #3296fa;
  }
}
</style>
