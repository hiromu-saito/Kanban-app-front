<template>
  <div class="list-header">
    <span><slot/></span>
    <KbnIcon
      :disabled="disableAddTaskForm"
      @click="handleClick">
      ＋
    </KbnIcon>
  </div>
</template>

<script>
import KbnIcon from '@/components/atoms/KbnIcon'

export default {
  name: 'KbnTaskListHeader',
  components: {
    KbnIcon
  },
  props: {
    disableAddTaskForm: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick (ev) {
      this.$emit('click', ev)
    }
  }
}
</script>

<style scoped>
.list-header{
  display: flex;
  justify-content:space-between ;
  /* border: 1px solid #000; */
}

</style>
