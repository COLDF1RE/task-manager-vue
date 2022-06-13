<template>
  <div class="main">
    <BoardHeader>
      <template #title>
        <h1 class="board-header__info-title">{{ currentUser.username }}</h1>
      </template>
      <template #options>
        <MyButton @click="$router.push('/tasks/event/')" class="board-header__options-btn button--default">Добавить задачу</MyButton>
        <MyButton @click="toggleModal" class="board-header__options-btn button--primary">Редактировать</MyButton>
      </template>
    </BoardHeader>

    <Board>
      <div class="user-profile">
        <div class="user-profile__info">
          <div class="user-profile__info-img-block">
            <img :src="currentUser.photoUrl ? currentUser.photoUrl : defaultAvatar" alt="avatar" class="user-profile__info-img"/>
          </div>
          <h3 class="user-profile__info-title">О себе</h3>
          <p class="user-profile__info-text">{{ currentUser.about }}</p>
        </div>

        <div class="user-profile__tasks">
          <h3 class="user-profile__tasks-title">Задачи</h3>
          <div class="user-profile__tasks-wrap">
            <TaskItem v-if="tasks.length"
                      v-for="task in tasks.slice(paging.firstIndex, paging.lastIndex)"
                      :key="task.id"
                      :task="task"
            />
            <EmptyList v-else/>
          </div>
          <Pagination v-on:newPage="setPage($event)" :paging="paging"/>

        </div>
      </div>
    </Board>

    <Modal v-show="isShowModal" :show="isShowModal" @close="toggleModal">
      <form>
        <h3 class="modal__window-title">Редактирование пользователя</h3>
        <div class="modal__window-body">
          <label class="modal__window-subtitle">Имя пользователя</label>
          <MyInput
              class="modal__window-input"
              v-model="form.username"
              required
          />

          <label class="modal__window-subtitle">URL фотографии</label>
          <MyInput
              class="modal__window-input"
              v-model="form.photoUrl"
          />

          <label class="modal__window-subtitle">О себе</label>
          <MyTextarea
              class="modal__window-textarea"
              v-model="form.about"
          />

        </div>
        <div class="modal__window-buttons">
          <MyButton class="modal__window-submit button--primary" @click="editUser">Добавить</MyButton>
          <MyButton class="modal__window-cancel button--default" @click="toggleModal">Отмена</MyButton>
        </div>
      </form>
    </Modal>

  </div>
</template>


<script>
import BoardHeader from "../components/BoardHeader";
import MyButton from "../components/UI/MyButton";
import Pagination from "../components/UI/Pagination";
import TaskItem from "../components/TaskItem";
import {mapActions, mapGetters} from "vuex";
import Board from "../components/UI/Board";
import MyModal from "../components/Modal";
import EmptyList from "../components/EmptyList";
import MyInput from "../components/UI/MyInput";
import MyTextarea from "../components/UI/MyTextarea";
import Modal from "../components/Modal";

export default {
  components: {Modal, MyTextarea, MyInput, EmptyList, MyModal, Board, TaskItem, Pagination, MyButton, BoardHeader},
  data() {
    return {
      currentUser: {},
      tasks: [],
      defaultAvatar: 'https://mustact.by/img/empty/artist.avatar.png',

      isShowModal: false,
      isTaskLoading: false,

      form: {
        id: '',
        login: '',
        username: '',
        about: '',
        photoUrl: '',
        password: "123",
      },

      filter: {
        query: "",
        assignedUsers:[this.$route.params.id],
        userIds: [],
        type: [],
        status: [],
        rank: []
      },

      paging: {
        page: 1,
        limit: 10,
        total: 0,
        firstIndex: 0,
        lastIndex: 10,
      },
    }
  },
  watch:{
    currentUser(){
      this.form = {...this.currentUser, password: '123'}
    },
    tasks(){
      this.paging.lastIndex = this.paging.page * this.paging.limit
      this.paging.firstIndex = this.paging.lastIndex - this.paging.limit
      // this.tasksSliced = this.tasks.data.slice(this.paging.firstIndex, this.paging.lastIndex)
      this.paging.total = this.tasks.length
    },
    paging:{
      handler: function () {
        this.paging.lastIndex = this.paging.page * this.paging.limit
        this.paging.firstIndex = this.paging.lastIndex - this.paging.limit
        // this.tasksSliced = this.tasks.data.slice(this.paging.firstIndex, this.paging.lastIndex)
      },
      deep: true
    }
  },
  mounted() {
    this.setActiveTab('users')
    this.$api.Events.getCurrentUser(this.$route.params.id)
        .then((data) => {
          this.currentUser = data.data
        })
    this.$api.Events.getTasks(this.filter)
        .then((data) => {
          this.tasks = data.data.data
        })
    // this.fetchTasks(this.filter)
  },
  computed: {
    // ...mapGetters(['tasks'])
  },
  methods: {
    ...mapActions(['fetchTasks', 'setActiveTab']),
    // handleFieldChange(evt){
    //   const {name, value} = evt.target
    //   this.form = ({...this.form, [name]: value})
    //   console.log('form editUser: ',this.form)
    // },
    editUser(evt) {
      this.$api.Events.editUser(this.form)
      localStorage.setItem('userPhotoUrl', this.form.photoUrl)
      localStorage.setItem('username', this.form.username)
      this.isShowModal = false
    },
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
    setPage(evn){
      this.paging.page = evn
    },
  }
}
</script>


<style lang="scss" scoped>
.user-profile {
  display: flex;
  padding: 20px 0;
  height: 100%;
  color: #333333;
  .pagination {
    padding: 0;
  }
  &__info {
    max-width: 320px;
    padding: 0 20px;
    border-right: 1px solid #B5B5B5;
    height: 100%;
    &-img-block {
      height: 186px;
      width: 186px;
      border-radius: 107px;
      border: 1px solid red;
      background-color: #7B61FF;
      margin-bottom: 20px;
      overflow: hidden;
    }
    &-img {
      object-fit: cover;
      height: 100%;
    }
    &-title {
      color: #CCCCCC;
      margin-bottom: 5px;
    }
    &-text {}
  }
  &__tasks {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
    &-title {
      color: #CCCCCC;
      margin-bottom: 5px;
    }
    &-wrap {
      box-shadow: inset 0 0 2px 1px #B5B5B5;
      border-radius: 5px;
      margin-bottom: 20px;
      flex: 1 0 auto;
      z-index: 2;
      position: relative;
      padding: 2px;
      display: flex;
      flex-direction: column;
    }
    &-item {
      width: 100%;
    }
  }
}
</style>