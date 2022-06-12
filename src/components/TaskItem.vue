<template>
  <div class="task">

    <div class="task__img">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 5C0 2.23858 2.23858 0 5 0H19C21.7614 0 24 2.23858 24 5V19C24 21.7614 21.7614 24 19 24H5C2.23858 24 0 21.7614 0 19V5Z"
            :fill="type === 'task' ? '#00D1FF' : '#EB4F4F'"/>
        <circle cx="12" cy="12" r="6" fill="white"/>
      </svg>
    </div>
    <a @click="$router.push('tasks/' + id)" class="task__title">{{ title }} </a>
    <div class="task__username">{{ username }}</div>

    <Status :status="status" class="task__status"/>

    <Rank :rank="rank"/>

    <div class="task__btn">
      <svg @click="toggleMenuActive" class="task__btn-img" width="20" height="20" viewBox="0 0 20 20" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 5C0 2.23858 2.23858 0 5 0H15C17.7614 0 20 2.23858 20 5V15C20 17.7614 17.7614 20 15 20H5C2.23858 20 0 17.7614 0 15V5Z"
            :fill="menuActive ? '#7B61FF' : 'transparent'"/>
        <path
            d="M5 5C5 4.44772 5.44772 4 6 4H14C14.5523 4 15 4.44772 15 5C15 5.55228 14.5523 6 14 6H6C5.44772 6 5 5.55228 5 5Z"
            :fill="menuActive ? '#F4F4F4' : '#7B61FF'"/>
        <path
            d="M5 10C5 9.44772 5.44772 9 6 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10Z"
            :fill="menuActive ? '#F4F4F4' : '#7B61FF'"/>
        <path
            d="M5 15C5 14.4477 5.44772 14 6 14H14C14.5523 14 15 14.4477 15 15C15 15.5523 14.5523 16 14 16H6C5.44772 16 5 15.5523 5 15Z"
            :fill="menuActive ? '#F4F4F4' : '#7B61FF'"/>
      </svg>

      <Menu :menuActive="menuActive" >
        <li v-if="userId === localStorageUserId">
          <a class="menu__list-item" @click="$router.push('/tasks/event/' + id)">Редактировать</a>
        </li>
        <li v-if="userId === localStorageUserId">
          <button class="menu__list-item" style="color: red" @click="deleteTask">Удалить</button>
        </li>

        <li v-if="status === 'opened'" v-for="item in opened" :key="item.value">
          <button @click="changeStatusTask" :value="item.value" class="menu__list-item">{{ item.name }}</button>
        </li>
        <li v-if="status === 'inProgress'" v-for="item in inProgress" :key="item.value">
          <button @click="changeStatusTask" :value="item.value" class="menu__list-item">{{ item.name }}</button>
        </li>
        <li v-if="status === 'testing'" v-for="item in testing" :key="item.value">
          <button @click="changeStatusTask" :value="item.value" class="menu__list-item">{{ item.name }}</button>
        </li>
        <li v-if="status === 'complete'" v-for="item in complete" :key="item.value">
          <button @click="changeStatusTask" :value="item.value" class="menu__list-item">{{ item.name }}</button>
        </li>
      </Menu>
    </div>
  </div>
</template>


<script>
import Status from "./UI/Status";
import {mapActions} from "vuex";
import Rank from "./UI/Rank";

export default {
  components: {Rank, Status},
  props: {
    'task': {
      type: [Object]
    },
    'username': {
      type: String
    }
  },
  data() {
    return {
      id: this.task.id,
      type: this.task.type,
      title: this.task.title,
      userId: this.task.userId,
      status: this.task.status,
      rank: this.task.rank,

      menuActive: false,
      localStorageUserId: localStorage.getItem('userId'),

      opened: [{value: 'inProgress', name: 'Взять в работу'}, {value: 'complete', name: 'Отметить как выполненное'}],
      inProgress: [{value: 'opened', name: 'Заново открыть'}, {value: 'testing', name: 'Взять на тестирование'}, {value: 'complete', name: 'Отметить как выполненное'}],
      testing: [{value: 'opened', name: 'Заново открыть'}, {value: 'complete', name: 'Отметить как выполненное'}],
      complete: [{value: 'opened', name: 'Заново открыть'}],

      statusValues: {
        opened: 'Открыто',
        inProgress: 'В работе',
        testing: 'Тестирование',
        complete: 'Сделано',
      },
    }
  },
  methods: {
    ...mapActions(['fetchTasks']),
    toggleMenuActive() {
      this.menuActive = !this.menuActive
    },
    async deleteTask() {
      await this.$api.Events.deleteTask(this.id)
      await this.fetchTasks()
    },
    async changeStatusTask(evt) {
      const status = evt.target.value
      await this.$api.Events.changeStatusTask(this.id, status)
      await this.fetchTasks()
    },

  }
}
</script>


<style lang="scss" scoped>
@mixin z-index {
  @for $i from 1 through 99 {
    &:nth-child(#{$i}) {
      z-index: -$i;
    }
  }
}

.task {
  flex: 1;
  max-height: 64px;
  display: flex;
  padding: 0 30px;
  align-items: center;
  @include z-index;
  &:nth-child(2n) {
    background-color: #F2F2F2;
  }
  &__img {
    max-width:  70px;
    width: 100%;
    display: flex;
    justify-content: start;
    margin-right: 14px;
  }
  &__title {
    max-width:  530px;
    width: 100%;
    margin-right: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  &__username {
    max-width:  180px;
    width: 100%;
    margin-right: 14px;
  }
  &__status {
    max-width:  120px;
    width: 100%;
    display: flex;
    margin-right: 14px;
  }
  &__btn {
    max-width:  85px;
    width: 100%;
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: end;
    &-img {
      display: flex;
    }
  }
}
.task__btn .menu {
  top: 22px;
}
</style>