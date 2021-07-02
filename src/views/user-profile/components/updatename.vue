<template>
<div class="update-name">
  <van-nav-bar
      left-text="取消"
      right-text="完成"
      title="设置昵称"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
</div>
</template>
<script>
import { updateUserprofile } from '@/api/user'
export default {
  name: 'UpdateName',
  data () {
    return {
      message: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (!this.message.length) {
          this.$toast('昵称不能为空')
        }
        await updateUserprofile({
          name: this.message
        })

        this.$emit('close')
        this.$emit('input', this.message)
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改昵称失败！')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.field-wrap{
  padding: 10px;
}
</style>
