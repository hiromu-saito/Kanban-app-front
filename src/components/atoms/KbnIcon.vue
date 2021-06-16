<template>
  <button
    type="text"
    @click="handleClick">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'KbnIcon',
  methods: {
    handleClick (ev) {
      this.$emit('click', ev)
    }
  }
}
</script>

<style>

</style>
