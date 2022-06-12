<template>
  <div>
    <div v-if="status === 'opened'" class="status status--default">Открыто</div>
    <div v-else-if="status === 'inProgress'" class="status status--yellow">В Работе</div>
    <div v-else-if="status === 'testing'" class="status status--yellow">Тестирование</div>
    <div v-else-if="status === 'complete'" class="status status--green">Сделано</div>
  </div>
</template>

<script>
export default {
  props: {
    status: String,
  }
}
</script>

<style lang="scss" scoped>
.status{
  font-size: 14px;
  line-height: 16px;
  padding: 2px 10px;
  border-radius: 5px;
  white-space: nowrap;
  display: inline-block;
  &--default {
    color: #333333;
    border: 1px solid #333333;
    background-color: #CCCCCC;
  }
  &--yellow {
    color: #846F00;
    border: 1px solid #846F00;
    background-color: #FFC700;
  }
  &--green {
    color: #157536;
    border: 1px solid #157536;
    background-color: #4BD379;
  }
  &--red {
    color: #6D1313;
    border: 1px solid #6D1313;
    background-color: #EB4F4F;
  }
}
</style>