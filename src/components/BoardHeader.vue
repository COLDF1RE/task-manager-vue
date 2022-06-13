<template>
  <section class="board-header">
    <div class="board-header__info">
      <slot name="title"></slot>
    </div>
    <div class="board-header__options">
      <slot name="options"></slot>
    </div>
  </section>
</template>


<script>
export default {

}
</script>


<style lang="scss" scoped>
.board-header {
  padding: 30px 20px 20px;
  max-width: 1320px;
  min-height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  &__info {
    display: flex;
    align-items: center;
    &-title {
      font-weight: 300;
      font-size: 24px;
      line-height: 28px;
      margin-right: 10px;
    }
    &-status {
      margin-left: 10px;
    }
  }
  &__options {
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    &-btn {
      margin-right: 5px;
      margin-bottom: 5px;
      white-space: nowrap;
    }
  }
}
</style>