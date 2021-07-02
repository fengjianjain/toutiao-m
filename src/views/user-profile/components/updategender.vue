<template>
<div class="update-gender">
 <van-picker
  title="标题"
  show-toolbar
  :columns="columns"
  @confirm="onConfirm"
  @cancel="onCancel"
  @change="onChange"
  :default-index="value"
/>
</div>
</template>
<script>
import { updateUserprofile } from '@/api/user'
export default {
  name: 'UpdateGender',
  data () {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    onCancel () {
      this.$emit('close')
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserprofile({
          gender: this.gender
        })

        this.$emit('close')
        this.$emit('input', this.gender)
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改昵称失败！')
      }
    },
    onChange (piker, value, index) {
      this.gender = index
    }
  }
}
</script>
<style lang='less' scoped>
</style>
