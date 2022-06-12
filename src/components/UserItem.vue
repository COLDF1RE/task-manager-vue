<template>
  <a @click="$router.push('users/' + userId)"  class="user">{{ username }}</a>
</template>


<script>
export default {
  props: {
    userId: {
      type: String
    },
    username: {
      type: String
    },
  }
}
</script>


<style lang="scss" scoped>
.user {
  padding: 24.5px 30px;
  display: block;
  &:nth-child(2n) {
    background-color: #F2F2F2;
    mix-blend-mode: multiply;
  }
}
</style>