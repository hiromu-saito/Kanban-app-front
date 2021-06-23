<template>
  <div class="task-form">
    <input
      v-model="name"
      type="text"
      placeholder="タスク...">
    <div>
      <kbn-button
        :disabled="disableAddTask"
        @click.prevent="addTask">
        追加
      </kbn-button>
      <kbn-button
        @click.prevent="cancelTask">
        キャンセル
      </kbn-button>
    </div>
  </div>
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton'

export default {
  name: 'KbnTaskForm',
  components: {
    KbnButton
  },
  props: {
    listId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      name: ''
    }
  },
  computed: {
    disableAddTask () {
      return this.name === ''
    }
  },
  methods: {
    addTask () {
      this.$emit('addTask', {listId: this.listId, name: this.name})
      this.name = ''
    },
    cancelTask () {
      this.$emit('cancelTask')
    }
  }
}
</script>

<style scoped>
.task-form{
  width: 90%;
  margin: 10px auto;
  border: dotted 1px #000;
  text-align: center;
}
.task-form div {
  display: flex;
  justify-content: space-around;
}

</style>
