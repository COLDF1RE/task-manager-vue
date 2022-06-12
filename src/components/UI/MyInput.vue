<template>
  <input :value="value" @input="updateInput" type="text" class="input" >
</template>

<script>
export default {
  props: {
    value: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  box-shadow: inset 0 0 2px 1px #B5B5B5;
  border-radius: 3px;
  width: 100%;
  height: 24px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 14px;
  padding: 5px 10px;
  &:hover {
    box-shadow: inset 0 0 2px 1px #7B61FF;
  }
  &::placeholder{
    color: #CCCCCC;
  }
}
</style>