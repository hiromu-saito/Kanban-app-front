<template>
  <div>
    <h1>Kanban-App</h1>
    <KbnButton
      :disabled="progress"
      type="text"
      @click.prevent="handleClick">
      ログオフ
    </KbnButton>
  </div>
</template>

<script>
import KbnButton from '@/components/atoms/KbnButton'

export default {
  name: 'KbnBoardNavigation',
  components: {
    KbnButton
  },
  props: {
    logOff: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      progress: false
    }
  },
  methods: {
    handleClick () {
      if (this.progress) { return }
      this.progress = true

      this.$nextTick(() => {
        this.logOff()
          .then(() => {
            this.progress = false
          })
          .catch((err) => {
            throw new Error(err.message)
          })
      })
    }
  }
}
</script>

<style>

</style>
