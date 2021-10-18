<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('user/clearUser', {})
    this.$router.push('/login')
  }
}
</script>