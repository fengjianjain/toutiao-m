<template>
  <div class="login-container">
    <van-nav-bar
     class="page-nav-bar"
     title="登录"
    >
    <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
       <van-field
         v-model="user.mobile"
         name="mobile"
         placeholder="请输入手机号"
         :rules="userFormRules.mobile"
         type="number"
         maxlength="11"
       >
       <i slot="left-icon" class="toutiao toutiao-shouji"></i>
       </van-field>
       <van-field
         v-model="user.code"
         name="code"
         placeholder="请输入验证码"
         :rules="userFormRules.code"
         type="number"
         maxlength="6"
       >
       <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
       <template #button>
         <van-count-down :time="1000 * 60"  format="ss s" v-if="isCountDownShow" @finish="isCountDownShow = false"/>
         <van-button round class="btncode" size="small" type="default" native-type="button" @click="onSendSms" v-else>发送验证码</van-button>
       </template>
       </van-field>
       <div class="login-btn-wrap">
         <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
       </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        console.log('登陆成功！')
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('登录失败，手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // 显示倒计时
      this.isCountDownShow = true
      // 发送验证码
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
.toutiao{
  font-size: 37px;
}
.btncode{
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px !important;
  color: #666;
}
.login-btn-wrap{
  padding: 53px 33px;
  .login-btn{
     background-color: #6dbcfb;
     border: none;
  }
}
}

</style>
