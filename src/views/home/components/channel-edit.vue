<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        size="mini"
        round
        type="danger"
        plain
        @click="isEditshow=!isEditshow"
      >{{isEditshow?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid class="mygrid" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(item,index) in myChannel"
        :key="index"
        @click="onUserChannelClick(item,index)"
      >
      <van-icon v-show="isEditshow && item.name !=='推荐'" slot="icon" name="close"></van-icon>
      <span slot="text" class="text" :class="{active:index===active}">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <van-cell  :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommand" :gutter="10">
      <van-grid-item
        class="channel-item"
        icon="plus"
        v-for="(item,index) in recommandchannel"
        :key="index"
        :text="item.name"
        @click="onAddchannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/chnnels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEditshow: false
    }
  },
  computed: {
    ...mapState(['user']),
    recommandchannel () {
      return this.allChannels.filter(channel => {
        return !this.myChannel.find(item => {
          return item.id === channel.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadAllchannels()
  },
  mounted () {},
  methods: {
    async loadAllchannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        // console.log(this.allChannels)
      } catch (error) {
        this.$toast('获取所有列表失败！')
      }
    },
    async onAddchannel (item) {
      try {
        this.myChannel.push(item)
        if (this.user) {
          await addUserChannel([{
            id: item.id, // 频道 id
            seq: this.myChannel.length // 频道的 序号
          }])
        } else {
          // 未登录，数据存储到本地
          setItem('channels', this.myChannel)
        }
      } catch (error) {
        this.$toast('添加频道失败')
      }
    },
    onUserChannelClick (item, index) {
      if (this.isEditshow) {
        if (item.name === '推荐') {
          return
        }
        if (index <= this.active) {
          this.$emit('update:active-index', this.active - 1)
        }
        this.myChannel.splice(index, 1)
        this.deleteChannel(item)
      } else {
        this.$emit('update:active-index', index)
        this.$emit('close-poup')
      }
    },
    async deleteChannel (item) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          await deleteUserChannel(item.id)
        } else {
          // 未登录，将数据存储到本地
          setItem('channels', this.myChannel)
        }
      } catch (err) {
        console.log(err)
        this.$toast('删除频道失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit{
  padding: 85px 0;
}
.title-text{
font-size: 32px;
color: #333;
}
.edit-btn{
  width: 104px;
  height: 48px;
  font-size: 26px;
  color: #f85959;
  border: 1px solid #f85959;
}
/deep/.channel-item{
  width: 160px;
  height: 86px;
  .van-grid-item__content{
    background-color: #f4f5f6;
    white-space: nowrap;
    .van-grid-item__text,.text {
        color: #222;
        font-size: 28px;
        margin-top: 0px;
      }
      .active{
        color: red;
      }
  }
}
/deep/.mygrid{
  .van-grid-item__icon-wrapper{
    position: unset;
  }
  .van-icon-close{
    position: absolute;
    right: -10px;
    top:-10px;
    font-size: 30px;
  }
}
/deep/.recommand{
  .van-grid-item__content{
    flex-direction: row;
    .van-icon-plus{
      font-size: 28px;
      margin-right: 6px;
    }
  }
}
</style>
