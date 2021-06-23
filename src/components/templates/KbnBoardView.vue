<template>
  <div>
    <kbn-board-navigation
      :logout="logout"/>
    <kbn-board-task/>
  </div>
</template>

<script>
import KbnBoardTask from '../organsms/KbnBoardTask'
import KbnBoardNavigation from '../moleclues/KbnBoardNavigation.vue'

/* eslint-disable */
export default{
  name: 'KbnBoardView',
  components: {
     KbnBoardTask,
     KbnBoardNavigation
  },
  methods:{
    logout(){
      const authInfo = this.$store.state.auth
      return this.$store.dispatch('logout', authInfo)
        .then(() => {
          this.$router.push({path: '/login'})
        })
        .catch(err => this.throwReject(err))
    },
    throwReject (err) {
      return Promise.reject(err)
    }
  // /* NOTE: ErrorBoundary の動作確認ためのコード
  // created(){
  //   throw new Error('レンダリングに失敗しました！')
  // }
  // */
}
}

/* eslint-enable */
</script>
