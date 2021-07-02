<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count>0?`${comment.reply_count}条回复`:'暂无回复'">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('click-close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
    <comment-item :comment="comment"></comment-item>
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <comment-list :articleId="comment.com_id" type="c" :list="commentlist"></comment-list>
    <!-- /评论的回复列表 -->
    </div>

    <!-- 底部 -->
    <div class="post-wrap">
      <van-button size="small" round class="post-btn" @click="show=true">写评论</van-button>
    </div>
    <!-- /底部 -->
    <van-popup v-model="show" position="bottom">
      <comment-post :target="comment.com_id" @onPost="onpostsuccess"></comment-post>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      show: false,
      commentlist: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onpostsuccess (data) {
      this.comment.reply_count++
      this.show = false
      this.commentlist.unshift(data.new_obj)
    }
  }
}
</script>
<style lang='less' scoped>
.scroll-wrap{
  position: fixed;
  top:92px;
  bottom: 88px;
  left: 0;
  right: 0;
  overflow-y:auto;
}
.post-wrap{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: 88px;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn{
     width: 60%;
  }
}
</style>
