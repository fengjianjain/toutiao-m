<template>
<div class="update-birthday">
<van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  :min-date="minDate"
  :max-date="maxDate"
  @cancel="$emit('close')"
  @confirm="onConfirm"
/>
</div>
</template>
<script>
import { updateUserprofile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
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
      const Currentdate = dayjs(this.currentDate).format('YYYY-MM-DD')
      try {
        await updateUserprofile({
          birthday: Currentdate
        })

        this.$emit('close')
        this.$emit('input', Currentdate)
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改生日失败！')
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
