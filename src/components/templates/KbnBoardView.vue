<template>
  <div>
    <kbn-board-navigation/>
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
  // /* NOTE: ErrorBoundary の動作確認ためのコード
  // created(){
  //   throw new Error('レンダリングに失敗しました！')
  // }
  // */
}

/* eslint-enable */
</script>
