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
  mounted () {
    // this.$store.dispatch('fetchList')
    //   .then(res => {
    //     this.lists = res.lists
    //   })
    //   .catch(err => {
    //     throw err
    //   })
    this.lists = [
      {id: 1, name: 'TODO', items: [{id: 1, name: 'task', description: 'description'}]},
      {id: 2, name: 'WIP', items: [{id: 1, name: 'task', description: 'description'}]},
      {id: 3, name: 'DONE', items: [{id: 1, name: 'task', description: 'description'}]}
    ]
  }
}
</script>

<style scoped>
section{
  display: flex;
  justify-content: space-around;
}

</style>
