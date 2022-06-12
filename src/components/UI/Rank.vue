<template>
  <div class="rank">
    <div class="rank__icon">
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path v-if="rank === 'low'" d="M7 8L14 0L7 4L0 0L7 8Z" fill="#3CA961"/>
        <path v-if="rank === 'medium'" d="M7 0L0 3L7 6L14 3L7 0Z" fill="#E9B500"/>
        <path v-if="rank === 'high'" d="M7 0L0 8L7 4L14 8L7 0Z" fill="#D14343"/>
      </svg>
      <p v-if="rank === 'low'" class="=rank__text rank__text--green">Низкий</p>
      <p v-if="rank === 'medium'" class="=rank__text rank__text--yellow">Средний</p>
      <p v-if="rank === 'high'" class="=rank__text rank__text--red">Высокий</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rank: String,
  },
}
</script>

<style lang="scss" scoped>
  .rank {
    max-width: 120px;
    width: 100%;
    margin-right: 14px;
    display: flex;
    align-items: center;
    &__icon {
      display: flex;
      align-items: center;
      margin-right: 4px;
    }
    &__text {
      font-size: 14px;
      line-height: 16px;
    }
    &__text--red {
      color: #D14343;
    }
    &__text--green {
      color: #3CA961;
    }
    &__text--yellow {
      color: #E9B500;
    }
  }
</style>