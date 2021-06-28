<template>
  <div>
    <section>
      <kbn-task-list
        v-for="list in lists"
        :key="list.id"
        :list="list"/>
    </section>
  </div>
</template>

<script>
import KbnTaskList from './KbnTaskList'

export default {
  name: 'KbnBoardTask',
  components: { KbnTaskList },
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
section{
  display: flex;
  justify-content: space-around;
}

</style>
