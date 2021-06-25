<template>
  <div>
    <p>
      タスク名<br >
      <input
        v-model="inputTask.name"
        type="text" >
    </p>
    <p>
      説明<br >
      <textarea
        v-model="inputTask.description"
        cols="30"
        rows="10" />
    </p>
    <p>
      <KbnButton @click="updateTask">
        更新
      </KbnButton>
    </p>
  </div>
</template>

<script>
import KbnButton from '../atoms/KbnButton.vue'
export default {
  name: 'KbnTaskDetailForm',
  components: { KbnButton },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      inputTask: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      const { name, description, listId, id } = this.task
      this.inputTask = { name, description, listId, id }
    })
  },
  methods: {
    updateTask () {
      this.$store.dispatch('updateTask', this.inputTask)
        .then(() => {
          this.$emit('close-mordal')
        })
        .catch(err => {
          throw err
        })
    }
  }
}
</script>

<style scoped>
button {
  float: right;
}
</style>
