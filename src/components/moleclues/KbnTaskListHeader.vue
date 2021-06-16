<template>
  <div>
    <span><slot/></span>
    <KbnIcon @click="addTaskForm">
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
    addTaskForm: {
      type: Function,
      required: true
    }
  }
}
</script>

<style>

</style>
