<template>
  <div class="task-card">
    {{ task.name }}
    <kbn-icon @click="removeTask">×</kbn-icon>
  </div>
</template>

<script>
import KbnIcon from '../atoms/KbnIcon.vue'

export default {
  name: 'KbnTaskCard',
  components: {
    KbnIcon
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeTask () {
      return this.$store.dispatch('removeTask', this.task)
        .then(() => {})
        .catch(() => alert('処理に失敗しました'))
    }
  }
}
</script>

<style scoped>
.task-card{
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
  border: solid 1px #000;
}

</style>
