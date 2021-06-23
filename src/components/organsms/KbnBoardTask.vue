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
  data () {
    return {
      lists: []
    }
  },
  created () {
    this.$nextTick(() => {
      this.$store.dispatch('fetchList')
        .then(() => {
          this.lists = this.$store.state.board.lists
        })
        .catch(err => {
          throw err
        })
    })
  }
}
</script>

<style scoped>
section{
  display: flex;
  justify-content: space-around;
}

</style>
