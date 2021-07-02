<template>
<div class="update-photo">
  <img class="img" :src="img" ref="photo">
  <div class="tool-bar">
    <div class="cancel" @click="$emit('close')">取消</div>
    <div class="finished" @click="onconfirm">完成</div>
  </div>
</div>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user.js'
export default {
  name: 'UpdatePhoto',
  data () {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted () {
    const image = this.$refs.photo
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
    // console.log(cropper)
  },
  methods: {
    onconfirm () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        // updateUserPhoto({
        //   photo:blob
        // })  错误的！
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '保存中'
        })
        try {
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await updateUserPhoto(formData)
          // console.log(data)
          this.$emit('close')
          this.$emit('updatephoto', data.data.photo)
          this.$toast.success('修改成功')
        } catch (error) {
          this.$toast.fail('修改失败！')
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.update-photo{
  height: 100%;
  background-color: #000;
  .tool-bar{
    position:fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,.finished{
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img{
  display: block;
  max-width: 100%;
}
</style>
