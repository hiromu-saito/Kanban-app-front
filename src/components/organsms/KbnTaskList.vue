<template>
  <div class="task-list">
    <kbn-task-list-header
      :disabled="disabledAddTaskForm"
      class="list-header"
      @click.prevent="addTaskForm">
      {{ list. name }}
    </kbn-task-list-header>
    <draggable
      v-model="draggableItems"
      :data-column-id="list.id"
      group="items"
      class="draggable"
      @change="handleChange"
      @end="handleEnd">
      <kbn-task-card
        v-for="item in draggableItems"
        :key="item.id"
        :task="item"
        :list-id="list.id"
        class="task-card"/>
    </draggable>
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
import draggable from 'vuedraggable'

export default {
  name: 'KbnTaskLits',
  components: {
    KbnTaskListHeader,
    KbnTaskForm,
    KbnTaskCard,
    draggable
  },
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
  computed: {
    draggableItems: {
      get () { return this.list.items },
      set (value) {

      }
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
    },
    handleChange ({ added, removed }) {
      if (added) {
        return this.$store.dispatch('moveToTask', {
          id: added.element.id,
          listId: this.list.id
        }).catch(err => Promise.reject(err))
      } else if (removed) {
        return this.$store.dispatch('moveFromTask', {
          id: removed.element.id,
          listId: this.list.id
        }).catch(err => Promise.reject(err))
      }
    },
    handleEnd () {
      console.log(this.$store.state.board)
      return this.$store.dispatch('executionMoveTask')
        .catch(err => Promise.reject(err))
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
  cursor: pointer;
}
.draggable{
  padding-bottom: 30px;
}
</style>
