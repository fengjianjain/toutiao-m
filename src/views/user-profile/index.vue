<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input type="file" hidden ref="fileref" @change="onFilechange"/>
    <!-- 个人信息 -->
    <van-cell class="avatar-cell" title="头像" is-link center @click="$refs.fileref.click()">
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="userinfo.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="userinfo.name" is-link @click="isUpdateNameShow=true"/>
    <van-cell title="性别" :value="userinfo.gender===1?'女':'男'" is-link  @click="isUpdateGenderShow=true"/>
    <van-cell title="生日" :value="userinfo.birthday" is-link @click="isUpdateBirthdayShow=true"/>
    <!-- /个人信息 -->
    <!-- 编辑昵称 -->
    <van-popup
    v-model="isUpdateNameShow"
    position="bottom"
    style="height:100%;"
    >
    <update-name @close="isUpdateNameShow=false" v-model="userinfo.name" v-if="isUpdateNameShow"></update-name>
    </van-popup>
    <!-- /编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup
    v-model="isUpdateGenderShow"
    position="bottom"
    >
    <update-gender v-model="userinfo.gender" v-if="isUpdateGenderShow" @close="isUpdateGenderShow=false"></update-gender>
    </van-popup>
    <!-- /编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup
    v-model="isUpdateBirthdayShow"
    position="bottom"
    >
    <update-birthday v-model="userinfo.birthday" @close="isUpdateBirthdayShow=false" v-if="isUpdateBirthdayShow"></update-birthday>
    </van-popup>
    <!-- /编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup
    v-model="isUpdatePhotoShow"
    position="bottom"
    style="height:100%;"
    >
    <update-photo :img="img" @close="isUpdatePhotoShow=false" @updatephoto="userinfo.photo=$event" v-if="isUpdatePhotoShow"></update-photo>
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserprofile } from '@/api/user.js'
import UpdateName from './components/updatename'
import UpdateGender from './components/updategender'
import UpdateBirthday from './components/updatebirthday'
import UpdatePhoto from './components/updatephoto'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {},
  data () {
    return {
      userinfo: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserprofile()
  },
  mounted () {},
  methods: {
    async loadUserprofile () {
      try {
        const { data } = await getUserprofile()
        this.userinfo = data.data
        // console.log(this.userinfo)
      } catch (error) {
        this.$toast('获取用户数据失败！')
      }
    },
    onFilechange () {
      const file = this.$refs.fileref.files[0]
      const data = window.URL.createObjectURL(file)
      this.img = data
      console.log(data)
      this.isUpdatePhotoShow = true
      console.log(this.$refs.fileref.value)
      this.$refs.fileref.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
  .van-popup{
    background-color: #f3f5f7;
  }
}
</style>
