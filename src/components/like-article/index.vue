<template>
      <van-button
        :icon="value===1?'good-job':'good-job-o'"
        :class="{
          liked:value===1
        }"
        :loading="loading"
        @click="onLike"
      />
</template>
<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onLike () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await deleteLike(this.articleId)
          this.$toast.success('取消点赞')
        } else {
          await addLike(this.articleId)
          status = 1
          this.$toast.success('点赞成功')
        }
        this.$emit('input', status)
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>
<style lang='less' scoped>
.liked{
  .van-icon{
     color: #e5645f;
   }
}
</style>
