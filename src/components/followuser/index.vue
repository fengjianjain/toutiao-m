<template>
          <van-button

            round
            size="small"
            v-if="isfollow"
            @click="onfollow"
            :loading="isFollowLoading"
          >已关注</van-button>
          <van-button
            v-else

            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onfollow"
            :loading="isFollowLoading"
          >关注</van-button>
</template>
<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  data () {
    return {
      isFollowLoading: false
    }
  },
  props: {
    isfollow: {
      type: Boolean,
      required: true
    },
    autid: {
      type: [Number, String, Object],
      required: true
    }
  },
  model: {
    prop: 'isfollow', // 默认value
    event: 'updatefollow'// 默认input
  },
  methods: {
    async onfollow () {
      this.isFollowLoading = true
      try {
        if (this.isfollow) {
          await deleteFollow(this.autid)
        } else {
          await addFollow(this.autid)
        }
        this.$emit('updatefollow', !this.isfollow)
      } catch (error) {
        let message = '操作失败'
        if (error.response && error.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast.fail(message)
      }
      this.isFollowLoading = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>
