<template>
  <button
    :class="classes"
    :disabled="disabled"
    @click.prevent="handleClick">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'KbnButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      const cls = this.type === 'text' ? ('-' + this.type) : ''
      return `kbn-button${cls}`
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
.kbn-button{
  padding:.6em 1.3em;
}
.kbn-button-text{
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
</style>
