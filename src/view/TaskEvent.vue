<template>
  <div class="main">

    <BoardHeader>
      <template #title>
        <h1 class="board-header__info-title">{{ $route.params.id ? 'Редактирование' : 'Создание' }}</h1>
      </template>
      <template #options>
        <MyButton @click="createOrEditTask" class="board-header__options-btn button--primary">Сохранить</MyButton>
        <MyButton type="submit" @click="$router.back()" class="board-header__options-btn button--default">Отмена</MyButton>
      </template>
    </BoardHeader>

    <Board>
      <form class="task-edit">
        <fieldset class="task-edit__info">

          <label class="task-edit__info-title">Исполнитель</label>
          <Dropdown class="task-edit__info-select z-index3">
            <template #title>
              {{ getUserName() !== undefined ? getUserName().username : '' }}
            </template>
            <template #list>
              <Checkbox v-for="user in users"
                        :key="user.id"
                        :value="user.id"
                        :title="user.username"
                        inputType="radio"
                        :checkedItems="form.assignedId"
                        @change="setFormAssignedUsers"
              />
            </template>
          </Dropdown>

          <label class="task-edit__info-title">Тип запроса</label>
          <Dropdown class="task-edit__info-select z-index2">
            <template #title>
              {{ getDropdownTitle(form.type, '', type) }}
            </template>
            <template #list>
              <Checkbox v-for="[key, value] in Object.entries(type)"
                        :key="key"
                        :value="key"
                        :title="value"
                        inputType="radio"
                        :checkedItems="form.type"
                        @change="setFormType"
              />
            </template>
          </Dropdown>

          <label class="task-edit__info-title">Приоритет</label>
          <Dropdown class="task-edit__info-select z-index1">
            <template #title>
              {{ getDropdownTitle(form.rank, '', rank) }}
            </template>
            <template #list>
              <Checkbox v-for="[key, value] in Object.entries(rank)"
                        :key="key"
                        :value="key"
                        :title="value"
                        inputType="radio"
                        :checkedItems="form.rank"
                        @change="setFormRank"
              />
            </template>
          </Dropdown>
        </fieldset>

        <fieldset class="task-edit__description">
          <label class="task-edit__description-title">Название</label>
          <MyInput v-model="form.title" class="task-edit__description-input" required/>
          <label class="task-edit__description-title">Описание</label>
          <MyTextarea v-model="form.description" class="task-edit__description-textarea"/>
        </fieldset>

      </form>
    </Board>
  </div>
</template>


<script>
import BoardHeader from "../components/BoardHeader";
import MyButton from "../components/UI/MyButton";
import {mapActions, mapGetters} from "vuex";
import MyInput from "../components/UI/MyInput";
import MyTextarea from "../components/UI/MyTextarea";
import Board from "../components/UI/Board";
export default {
  components: {Board, MyTextarea, MyInput, MyButton, BoardHeader},
  data() {
    return {
      type: {
        task: 'Задача',
        bug: 'Ошибка'
      },

      rank: {
        low: 'Низкий',
        medium: 'Средний',
        high: 'Высокий',
      },

      currentTask: {},

      form: {
        userId: localStorage.getItem('userId'),
        assignedId: '',
        title: '',
        description: '',
        type: '',
        rank: '',
      }
    }
  },
  computed: {
    ...mapGetters(['users'])
  },
  mounted() {
    this.fetchCurrentTasks()
    this.fetchUsers()
    this.setActiveTab('tasks')
  },
  watch: {
    currentTask(){
      this.form = {
        id: this.currentTask.id,
        userId: localStorage.getItem('userId'),
        assignedId: this.currentTask.assignedId,
        title: this.currentTask.title,
        description: this.currentTask.description,
        type: this.currentTask.type,
        dateOfCreation: this.currentTask.dateOfCreation,
        dateOfUpdate: this.currentTask.dateOfUpdate,
        timeInMinutes: this.currentTask.timeInMinutes,
        status: this.currentTask.status,
        rank: this.currentTask.rank,
      }
    },
  },
  methods: {
    ...mapActions(['fetchUsers', 'setActiveTab']),
    fetchCurrentTasks() {
      if(this.$route.params.id) {
        this.$api.Events.getCurrentTask(this.$route.params.id)
            .then((data) => {
              this.currentTask = data.data
            })
      }
    },

    createOrEditTask() {
      this.$api.Events.createOrEditTask(this.form)
      this.$router.back()
    },

    getDropdownTitle (arr, defaultTitle, constsObj) {
      if (arr.length === 0) {
        return defaultTitle
      } else {
        return constsObj[arr]
      }
    },
    setFormType(value) {
      this.form.type = value
    },
    setFormRank(value) {
      this.form.rank = value
    },
    setFormAssignedUsers(value) {
      this.form.assignedId = value
    },
    getUserName() {
      let username = this.users.find(user => user.id === this.form.assignedId)
      return username
    },
  }
}
</script>


<style lang="scss" scoped>
.task-edit {
  display: flex;
  padding: 20px 0;
  color: #333333;
  background-color: #ffffff;
  height: 100%;
  &__info {
    padding: 0 20px;
    max-width: 340px;
    width: 100%;
    &-title {
      color: #CCCCCC;
      margin-bottom: 10px;
    }
    &-select {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 14px;
      width: 100%;
      height: 26px;
      margin-bottom: 35px;
      border-radius: 3px;
      position: relative;
    }
  }
  &__description {
    max-width: 440px;
    width: 100%;
    padding: 0 20px;
    border-right: 1px solid #B5B5B5;
    border-left: 1px solid #B5B5B5;
    &-title {
      color: #CCCCCC;
      margin-bottom: 10px;
    }
    &-input {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 14px;
      width: 100%;
      padding: 5px 10px;
      margin-bottom: 20px;
      box-shadow: inset 0 0 2px 1px #B5B5B5;
      border-radius: 3px;
    }
    &-input:hover {
      box-shadow: inset 0 0 2px 1px #7B61FF;
    }
    &-textarea {
      width: 100%;
      box-shadow: inset 0 0 2px 1px #B5B5B5;
      height: 625px;
    }
    &-textarea:hover {
      box-shadow: inset 0 0 2px 1px #7B61FF;
    }
  }
}
.z-index3 {
  z-index: 3;
}
.z-index2 {
  z-index: 2;
}
.z-index1 {
  z-index: 1;
}
</style>