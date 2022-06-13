<template>
  <div class="main">

    <BoardHeader>
      <template #title>
        <h1 class="board-header__info-title">Задачи</h1>
      </template>
      <template #options>
        <MyButton @click="$router.push('/tasks/event/')" class="board-header__options-btn button--primary">Добавить задачу</MyButton>
      </template>
    </BoardHeader>

    <Board>
      <TaskFilter :users="users"/>
      <Wrapper class="tasks-wrapper">
        <Loading v-if="loading"/>
        <TaskItem v-if="!loading && tasks.data" v-for="task in tasksSliced"
                  :key="task.id"
                  :task="task"
                  :username="getUserName(task.assignedId) !== undefined ? getUserName(task.assignedId).username : getUserName(task.userId)"
        />
        <EmptyList v-if="!loading && !tasksSliced.length"/>
      </Wrapper>

      <Pagination v-on:newPage="setPage($event)" :paging="paging"/>
    </Board>
  </div>
</template>


<script>
import BoardHeader from "../components/BoardHeader";
import MyButton from "../components/UI/MyButton";
import EmptyList from "../components/EmptyList";
import TaskItem from "../components/TaskItem";
import Pagination from "../components/UI/Pagination";
import TaskFilter from "../components/TaskFilter";
import {mapActions, mapGetters} from "vuex";
import Loading from "../components/UI/Loading";
import Board from "../components/UI/Board";
import Wrapper from "../components/UI/Wrapper";
export default {
  components: {Wrapper, Board, Loading, TaskFilter, Pagination, TaskItem, EmptyList, MyButton, BoardHeader},
  data(){
    return {
      tasksSliced: [],
      // users: [],
      // loading: false,
      firstIndex: 0,
      lastIndex: 10,
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,

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
    this.setActiveTab('tasks')

  },
  watch: {
    tasks(){
      this.paging.lastIndex = this.paging.page * this.paging.limit
      this.paging.firstIndex = this.paging.lastIndex - this.paging.limit
      this.tasksSliced = this.tasks.data.slice(this.paging.firstIndex, this.paging.lastIndex)
      this.paging.total = this.tasks.data.length
    },
    paging:{
      handler: function () {
        this.paging.lastIndex = this.paging.page * this.paging.limit
        this.paging.firstIndex = this.paging.lastIndex - this.paging.limit
        this.tasksSliced = this.tasks.data.slice(this.paging.firstIndex, this.paging.lastIndex)
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['loading', 'tasks', 'users'])
  },
  methods: {
    ...mapActions(['fetchTasks', 'fetchUsers', 'setActiveTab']),
    getUserName(taskUserId) {
      let username = this.users.find(user => user.id === taskUserId)
      return username
    },
    setPage(evn){
      this.paging.page = evn
    },
  }
}
</script>


<style lang="scss" scoped>

</style>