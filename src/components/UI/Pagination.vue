<template>
  <div v-if="totalPages" class="pagination">
    <div class="pagination__nav">

      <MyButton
          class="pagination__nav-prev"
          :class="page === 1 ? 'button--disabled' : 'button--default'"
          @click="prevPage"
      >
        Назад
      </MyButton>

      <MyButton
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="pagination__nav-page"
          :class="page === pageNumber ? 'button--primary' : 'button--default'"
          @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </MyButton>

      <MyButton
          class="pagination__nav-prev button"
          :class="page === totalPages ? 'button--disabled' : 'button--default'"
          @click="nextPage"
      >
        Вперед
      </MyButton>
    </div>
    <div class="pagination__info">
      {{info}}
    </div>
  </div>

</template>


<script>
import MyButton from "./MyButton";
export default {
  components: {MyButton},
  props: {
    paging: {
      type: Object,
    }
  },
  data() {
    return{
      page: 1,
      limit: 10,
      total: 0,
      firstIndex: 0,
      lastIndex: 10,
      totalPages: 3,
      info: '',
    }
  },
  methods: {
    changePage(pageNumber) {
      this.page = pageNumber
      this.$emit('newPage', pageNumber)
    },
    prevPage() {
      this.page -= 1
      this.$emit('newPage', this.page)
    },
    nextPage() {
      this.page += 1
      this.$emit('newPage', this.page)
    },
    setInfo(){
      this.info = (`Показано ${this.firstIndex + 1} - ${this.lastIndex <= this.total ? this.lastIndex : this.total} из ${this.total}`)
    }
  },
  mounted() {
    this.totalPages = Math.ceil(this.total / this.limit)
    this.setInfo()

    this.page = this.paging.page
    this.limit = this.paging.limit
    this.total = this.paging.total
    this.firstIndex = this.paging.firstIndex
    this.lastIndex = this.paging.lastIndex
  },

  watch: {
    total() {
      this.totalPages = Math.ceil(this.total / this.limit)
      this.setInfo()
    },
    paging:{
      handler: function () {
        this.page = this.paging.page
        this.limit = this.paging.limit
        this.total = this.paging.total
        this.firstIndex = this.paging.firstIndex
        this.lastIndex = this.paging.lastIndex
        this.setInfo()
      },
      deep: true
    }
  }
}
</script>


<style lang="scss" scoped>
.pagination {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  flex: 0 0 auto;
  &__nav {
    display: flex;
  }
  &__nav-prev,
  &__nav-next {
    margin-right: 5px;
  }
  &__nav-page {
    padding: 1.5px 7.5px;
    margin-right: 5px;
  }
  &__nav-page--active {
    color: #F4F4F4;
    background-color: #7B61FF;
  }
  &__info {
    font-size: 14px;
    line-height: 16px;
    color: #B5B5B5;
    display: flex;
    align-items: center;
  }
}
</style>