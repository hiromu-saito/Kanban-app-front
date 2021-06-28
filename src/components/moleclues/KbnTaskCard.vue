<template>
  <div class="task-card">
    <kbn-button
      type="text"
      class="kbn-button"
      @click="openMordal">
      {{ task.name }}
    </kbn-button>
    <kbn-icon
      class="kbn-icon"
      @click="removeTask">×</kbn-icon>
    <kbn-task-detail-mordal
      v-show="overlay"
      :task="taskInfo"
      @close-mordal="closeMordal"
    />
  </div>
</template>

<script>
import KbnButton from '../atoms/KbnButton.vue'
import KbnIcon from '../atoms/KbnIcon.vue'
import KbnTaskDetailMordal from '../templates/KbnTaskDetailMordal.vue'

export default {
  name: 'KbnTaskCard',
  components: {
    KbnIcon,
    KbnTaskDetailMordal,
    KbnButton
  },
  props: {
    task: {
      type: Object,
      required: true
    },
    listId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      overlay: false,
      taskInfo: {}
    }
  },
  mounted () {
    this.taskInfo = this.task
    this.taskInfo.listId = this.listId
  },
  methods: {
    removeTask () {
      const taskInfo = {listId: this.listId, id: this.task.id}
      return this.$store.dispatch('removeTask', taskInfo)
        .catch(() => {
          alert('処理に失敗しました')
        })
    },
    openMordal () {
      this.overlay = true
    },
    closeMordal () {
      this.overlay = false
    }
  }
}
</script>

<style scoped>
.task-card{
  display: flex;
  margin: 10px auto;
  /* border: solid 1px #000; */
  height: 26px;
}
.kbn-button{
  width: 90%;
  text-align: left;
}
.kbn-icon{
  width: 10%;
}
.kbn-icon:hover{
  font-weight: bold;
}
</style>
