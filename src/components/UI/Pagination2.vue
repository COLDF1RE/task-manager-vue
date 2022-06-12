<!--<template>-->
<!--  <div v-if="totalPages" class="pagination">-->
<!--    <div class="pagination__nav">-->

<!--      <MyButton-->
<!--          class="pagination__nav-prev"-->
<!--          :class="page === 1 ? 'button&#45;&#45;disabled' : 'button&#45;&#45;default'"-->
<!--          @click="prevPage"-->
<!--      >-->
<!--        Назад-->
<!--      </MyButton>-->

<!--      <MyButton-->
<!--          v-for="pageNumber in totalPages"-->
<!--          :key="pageNumber"-->
<!--          class="pagination__nav-page"-->
<!--          :class="page === pageNumber ? 'button&#45;&#45;primary' : 'button&#45;&#45;default'"-->
<!--          @click="changePage(pageNumber)"-->
<!--      >-->
<!--        {{ pageNumber }}-->
<!--      </MyButton>-->

<!--      <MyButton-->
<!--          class="pagination__nav-prev button"-->
<!--          :class="page === totalPages ? 'button&#45;&#45;disabled' : 'button&#45;&#45;default'"-->
<!--          @click="nextPage"-->
<!--      >-->
<!--        Вперед-->
<!--      </MyButton>-->
<!--    </div>-->
<!--    <div class="pagination__info">-->
<!--      {{info}}-->
<!--    </div>-->
<!--  </div>-->

<!--</template>-->


<!--<script>-->
<!--import MyButton from "./MyButton";-->
<!--export default {-->
<!--  components: {MyButton},-->
<!--  props: {-->
<!--    // paging: {-->
<!--    //   type: Object,-->
<!--    // },-->
<!--    page: {-->
<!--      type: Number,-->
<!--    },-->
<!--    limit: {-->
<!--      type: Number,-->
<!--    },-->
<!--    total: {-->
<!--      type: Number,-->
<!--    },-->
<!--    firstIndex: {-->
<!--      type: Number,-->
<!--    },-->
<!--    lastIndex: {-->
<!--      type: Number,-->
<!--    },-->
<!--  },-->
<!--  data() {-->
<!--    return{-->
<!--      page: 1,-->
<!--      // limit: 5,-->
<!--      // total: 0,-->
<!--      totalPages: 1,-->
<!--      info: '',-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    changePage(pageNumber) {-->
<!--      this.page = pageNumber-->
<!--    },-->
<!--    prevPage() {-->
<!--      this.page -= 1-->
<!--    },-->
<!--    nextPage() {-->
<!--      this.page += 1-->
<!--    },-->
<!--    setInfo(){-->
<!--      if(this.total >= this.firstIndex + 1 - this.lastIndex){-->
<!--        this.info = ('Показано ' + this.lastIndex + ' из ' + this.total)-->
<!--      } else {-->
<!--        this.info = ('Показано ' + this.total + ' из ' + this.total)-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.setInfo()-->
<!--  },-->
<!--  watch: {-->
<!--    total() {-->
<!--      this.totalPages = Math.ceil(this.total / this.limit)-->
<!--      this.setInfo()-->
<!--    },-->
<!--    // page() {-->
<!--    //   this.$api.Events.getTasks(this.filter, this.page? this.page - 1 : 0, this.limit)-->
<!--    //       .then((data) => {-->
<!--    //         this.tasks = data.data.data-->
<!--    //         this.total = data.data.total-->
<!--    //       })-->
<!--    // },-->
<!--  }-->
<!--}-->
<!--</script>-->


<!--<style lang="scss" scoped>-->

<!--.pagination {-->
<!--  background-color: #ffffff;-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  padding: 20px 20px;-->
<!--  flex: 0 0 auto;-->
<!--  &__nav {-->
<!--    display: flex;-->
<!--  }-->
<!--  &__nav-prev,-->
<!--  &__nav-next {-->
<!--    margin-right: 5px;-->
<!--  }-->
<!--  &__nav-page {-->
<!--    padding: 1.5px 7.5px;-->
<!--    margin-right: 5px;-->
<!--  }-->
<!--  &__nav-page&#45;&#45;active {-->
<!--    color: #F4F4F4;-->
<!--    background-color: #7B61FF;-->
<!--  }-->
<!--  &__info {-->
<!--    font-size: 14px;-->
<!--    line-height: 16px;-->
<!--    color: #B5B5B5;-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--  }-->
<!--}-->
<!--</style>-->