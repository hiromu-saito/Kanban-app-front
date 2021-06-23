<template>
  <div class="board-nav">
    <h1>Kanban-App</h1>
    <KbnButton
      v-show="!progress"
      class="kbn-button"
      type="text"
      @click.prevent="handleClick">
      ログオフ
    </KbnButton>
    <span
      v-show="progress"
      class="kbn-button">
      ログオフ中...
    </span>
  </div>
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton'

export default {
  name: 'KbnBoardNavigation',
  components: {
    KbnButton
  },
  props: {
    logout: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      progress: false
    }
  },
  methods: {
    handleClick () {
      if (this.progress) { return }
      this.progress = true
      this.$nextTick(() => {
        this.logout()
          .then(() => {
            this.progress = false
          })
          .catch((err) => {
            throw new Error(err.message)
          })
      })
    }
  }
}
</script>

<style scoped>
h1{
  display: inline-block;
  margin: 0;
  line-height: 80px;
}

.board-nav{
  border: dotted 1px #000;
  text-align: center;
  height: 80px;
  margin: 10px;
}
.kbn-button{
  float: right;
  height: 80px;
  margin-right: 50px;
}

</style>
