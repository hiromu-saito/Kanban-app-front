<template>
  <div>
    <input
      v-model="taskName"
      type="text"
      placeholder="タスク...">
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
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton'

export default {
  name: 'KbnTaskForm',
  components: {
    KbnButton
  },
  props: {
    addTask: {
      type: Function,
      required: true
    },
    cancelTask: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      taskName: ''
    }
  },
  computed: {
    disableAddTask () {
      return this.taskName === ''
    }
  }
}
</script>

<style>

</style>
