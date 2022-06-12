<template>
  <div class="main">

    <BoardHeader>
      <template #title>
        <h1 class="board-header__info-title">Пользователи</h1>
      </template>
      <template #options></template>
    </BoardHeader>

    <Board>
      <Wrapper>
        <UserItem v-if="users.length" v-for="user in users.slice(paging.firstIndex, paging.lastIndex)"
                  :key="user.id"
                  :userId="user.id"
                  :username="user.username"
        />
        <EmptyList v-else/>
      </Wrapper>
      <Pagination v-on:newPage="setPage($event)" :paging="paging" />
    </Board>

  </div>
</template>


<script>
import BoardHeader from "../components/BoardHeader";
import UserItem from "../components/UserItem";
import {mapActions, mapGetters} from "vuex";
import Board from "../components/UI/Board";
import Pagination2 from "../components/UI/Pagination2";
import Wrapper from "../components/UI/Wrapper";
import EmptyList from "../components/EmptyList";
import Pagination from "../components/UI/Pagination";
export default {
  components: {Pagination, EmptyList, Wrapper, Pagination2, Board, UserItem, BoardHeader},
  data(){
    return {
      paging: {
        page: 1,
        limit: 10,
        total: 1,
        firstIndex: 0,
        lastIndex: 10,
      },
    }
  },
  mounted() {
    this.fetchTasks()
    this.fetchUsers()
    this.setActiveTab('users')
  },
  computed: {
    ...mapGetters(['users', 'tasks'])
  },
  watch: {
    users(){
      this.paging.total = this.users.length
      this.paging.lastIndex = this.paging.page * this.paging.limit
      this.paging.firstIndex = this.paging.lastIndex - this.paging.limit
    },
    paging:{
      handler: function () {
        this.paging.lastIndex = this.paging.page * this.paging.limit
        this.paging.firstIndex = this.paging.lastIndex - this.paging.limit
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['fetchTasks', 'fetchUsers', 'setActiveTab']),
    setPage(evn){
      this.paging.page = evn
    },
  }
}
</script>


<style lang="scss" scoped>

</style>