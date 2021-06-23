<template>
  <div class="task-list">
    <kbn-task-list-header
      :disabled="disabledAddTaskForm"
      class="list-header"
      @click.prevent="addTaskForm">
      {{ list. name }}
    </kbn-task-list-header>
    <kbn-task-card
      v-for="item in list.items"
      :key="item.id"
      :task="item"
      :list-id="list.id"
      class="task-card"/>
    <kbn-task-form
      v-show="disabledAddTaskForm"
      :list-id="list.id"
      @cancelTask="cancelTaskForm"
      @addTask="addTask"/>
  </div>
</template>

<script>
import KbnTaskCard from '../moleclues/KbnTaskCard.vue'
import KbnTaskForm from '../moleclues/KbnTaskForm.vue'
import KbnTaskListHeader from '../moleclues/KbnTaskListHeader.vue'

export default {
  name: 'KbnTaskLits',
  components: { KbnTaskListHeader, KbnTaskForm, KbnTaskCard },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      disabledAddTaskForm: false
    }
  },
  methods: {
    addTaskForm () {
      this.disabledAddTaskForm = true
    },
    cancelTaskForm () {
      this.disabledAddTaskForm = false
    },
    addTask (taskInfo) {
      this.$store.dispatch('addTask', taskInfo)
        .then(() => {
          this.disabledAddTaskForm = false
        })
        .catch(() => { alert('処理に失敗しました') })
    }
  }

}
</script>

<style scoped>
.task-list{
  width: 200px;
  border: 3px #000 solid;
  height: 600px;
}
.list-header{
  border: solid 3px #000;
  margin: 0;
}
.task-card{
  border: 3px solid #000;
  border-radius: 5px;
}
</style>
