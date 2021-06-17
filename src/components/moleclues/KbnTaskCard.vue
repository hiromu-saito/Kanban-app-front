<template>
  <div>
    {{ task.name }}
    <kbn-icon @click="handleClick">×</kbn-icon>
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
    handleClick () {
      this.$emit('click', this.task.id)
    }
  }
}
</script>

<style>

</style>
