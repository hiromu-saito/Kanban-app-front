<template>
  <div>
    <kbn-board-task/>
  </div>
</template>

<script>
import KbnBoardTask from '../organsms/KbnBoardTask'

/* eslint-disable */
export default{
  name: 'KbnBoardView',
  components: { KbnBoardTask },
  // /* NOTE: ErrorBoundary の動作確認ためのコード
  // created(){
  //   throw new Error('レンダリングに失敗しました！')
  // }
  // */
}

/* eslint-enable */
</script>
