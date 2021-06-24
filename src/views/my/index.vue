<template>
  <div class="my-container">
    <div class="header">
      <div class="login-btn">
        <img
        class="mobile-img"
        src="~@/assets/mobile.png"
        @click="$router.push('/login')"
      >
      <span class="text">登录 / 注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.my-container {
  > .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
      .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
      }
      .text{
        font-size: 28px;
        color: #fff;
      }
    }

  }
}
</style>
