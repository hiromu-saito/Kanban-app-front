<template>
  <div>
    <input
      v-model="name"
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
    },
    cancelTask () {
      this.$emit('cancelTask')
    }
  }
}
</script>

<style>

</style>
