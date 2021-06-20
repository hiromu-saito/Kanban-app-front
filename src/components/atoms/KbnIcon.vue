<template>
  <button
    :disabled="disabled"
    type="text"
    @click="handleClick">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'KbnIcon',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick (ev) {
      this.$emit('click', ev)
    }
  }
}
</script>

<style>

</style>
