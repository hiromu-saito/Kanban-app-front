<template>
  <div class="login-view">
    <h1>Kanaban App</h1>
    <kbn-login-form :on-login="handleLogin"/>
  </div>
</template>

<script>
import KbnLoginForm from '../moleclues/KbnLoginForm.vue'
export default {
  name: 'KbnLoginView',
  components: { KbnLoginForm },
  methods: {
    handleLogin (authInfo) {
      return this.$store.dispatch('login', authInfo)
        .then(() => {
          this.$router.push({path: '/'})
        })
        .catch(err => this.throwReject(err))
    },
    throwReject (err) {
      return Promise.reject(err)
    }
  }
}
</script>

<style scoped>
.login-view {
  width: 320px;
  margin: auto;
}
</style>
