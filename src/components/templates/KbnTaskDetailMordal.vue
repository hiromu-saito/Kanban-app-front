<template>
  <div
    id="overlay">
    <div id="content">
      <p>
        <kbn-icon
          @click="closeMordal">×</kbn-icon>
      </p>
      <kbn-task-detail-form
        :task="task"
        @close-mordal="closeMordal"/>
    </div>
  </div>
</template>

<script>
import KbnIcon from '../atoms/KbnIcon.vue'
import KbnTaskDetailForm from '../moleclues/KbnTaskDetailForm.vue'
export default {
  name: 'KbnTaskDetailMordal',
  components: { KbnTaskDetailForm, KbnIcon },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeMordal () {
      this.$emit('close-mordal')
    }
  }
}
</script>

<style scope>
#overlay{
  /*要素を重ねた時の順番*/
  z-index:1;

  /*画面全体を覆う設定*/
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /* 画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;

}
#content{
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}

#content input,
#content textarea{
  width: 100%;
}
#content p button{
  float: right;
}
</style>
