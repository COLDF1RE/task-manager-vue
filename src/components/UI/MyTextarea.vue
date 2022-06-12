<template>
  <textarea
      class="textarea"
      :value="value"
      @input="updateInput"
  />
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
.textarea {
  box-shadow: inset 0 0 2px 1px #B5B5B5;
  border-radius: 3px;
  width: 100%;
  padding: 5px 10px;
  &:hover {
    box-shadow: inset 0 0 2px 1px #7B61FF;
  }
  &::placeholder{
    color: #CCCCCC;
    font-size: 14px;
    line-height: 17px;
    font-family: 'Inter', sans-serif;
  }
}
</style>