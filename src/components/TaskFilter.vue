<template>
  <form class="board-filter" >

    <Dropdown class="board-filter__type board-filter__item">
      <template #title>
        {{ getDropdownTitle(form.type, 'Тип', type) }}
      </template>
      <template #list>
        <Checkbox v-for="[key, value] in Object.entries(type)"
                  :key="key"
                  :value="key"
                  :title="value"
                  :checkedItems="form.type"
                  @change="setFormType"
        />
      </template>
    </Dropdown>

    <MyInput v-model="form.query" placeholder="Название задачи" class="board-filter__query-input board-filter__item"/>

    <Dropdown class="board-filter__user board-filter__item">
      <template #title>
        {{ getDropdownTitle('', 'Пользователь', '') }}
      </template>
      <template #list>
        <Checkbox v-for="user in users"
                  :key="user.id"
                  :value="user.id"
                  :title="user.username"
                  :checkedItems="form.assignedUsers"
                  @change="setFormAssignedUsers"
        />
      </template>
    </Dropdown>

    <Dropdown class="board-filter__status board-filter__item">
      <template #title>
        {{ getDropdownTitle(form.status, 'Статус', status) }}
      </template>
      <template #list>
        <Checkbox v-for="[key, value] in Object.entries(status)"
                  :key="key"
                  :value="key"
                  :title="value"
                  :checkedItems="form.status"
                  @change="setFormStatus"
        />
      </template>
    </Dropdown>

    <Dropdown class="board-filter__priority board-filter__item">
      <template #title>
        {{ getDropdownTitle(form.rank, 'Приоритет', rank) }}
      </template>
      <template #list>
        <Checkbox v-for="[key, value] in Object.entries(rank)"
                  :key="key"
                  :value="key"
                  :title="value"
                  :checkedItems="form.rank"
                  @change="setFormRank"
        />
      </template>
    </Dropdown>

<!--    <MyButton type="submit" class="board-filter__btn button&#45;&#45;primary">Применить</MyButton>-->
    <MyButton @click="handleSubmit" class="board-filter__btn button--primary">Применить</MyButton>

  </form>
</template>


<script>
import MyButton from "./UI/MyButton";
import MyInput from "./UI/MyInput";
import Checkbox from "./UI/Checkbox";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {Checkbox, MyInput, MyButton},
  data() {
    return {
      // type: [{value: 'task', name: 'Задача'}, {value: 'bug', name: 'Ошибка'}],
      // rank: [{value: 'low', name: 'Низкий'}, {value: 'medium', name: 'Средний'}, {value: 'high', name: 'Высокий'}],
      // status: [{value: 'opened', name: 'Открыто'}, {value: 'inProgress', name: 'В работе'}, {value: 'testing', name: 'Тестирование'}, {value: 'complete', name: 'Сделано'}],
      // typeTitle: {defaultName: 'Тип', name: 'type'},
      // rankTitle: {defaultName: 'Приоритет', name: 'rank'},
      // userTitle: {defaultName: 'Пользователь', name: 'assignedUsers'},
      // statusTitle: {defaultName: 'Статус', name: 'status'},

      type: {
        task: 'Задача',
        bug: 'Ошибка'
      },

      rank: {
        low: 'Низкий',
        medium: 'Средний',
        high: 'Высокий',
      },

      status: {
        opened: 'Открыто',
        inProgress: 'В работе',
        testing: 'Тестирование',
        complete: 'Сделано',
      },

      form: {
        query: '',
        assignedUsers: [],
        userIds: [],
        type: [],
        status: [],
        rank: []
      },
    }
  },
  computed: {
    ...mapGetters(['loading', 'tasks', 'users'])
  },
  methods: {
    ...mapActions(['fetchTasks', 'fetchUsers']),
    // handleFieldChange(evt) {
    //   const {name, value} = evt.target
    //   if (name === 'query') {
    //     this.form = ({...this.form, [name]: value})
    //   } else if (this.form[name].indexOf(value) === -1) {
    //     this.form = ({...this.form, [name]: [...this.form[name], value]})
    //   } else {
    //     this.form = ({...this.form, [name]: this.form[name].filter((i) => i !== value)})
    //   }
    // },
    handleSubmit(evt) {
      evt.preventDefault()
      this.fetchTasks(this.form)
      // this.fetchUsers()

      // this.$api.Events.getTasks(this.form, this.page - 1, this.limit)
      //     .then((data) => {
      //       this.tasks = data.data.data
      //       this.total = data.data.total
      //     })
    },

    getDropdownTitle (arr, defaultTitle, constsObj) {
      if (arr.length === 0) {
        return defaultTitle
      } else if (arr.length === 1){
        return constsObj[arr]
      } else {
        return `Выбрано: ${arr.length}`
      }
    },
    setFormType(value) {
      this.form.type = value
    },
    setFormStatus(value) {
      this.form.status = value
    },
    setFormRank(value) {
      this.form.rank = value
    },
    setFormAssignedUsers(value) {
      this.form.assignedUsers = value
    },
  }
}
</script>


<style lang="scss" scoped>
.board-filter {
  padding: 20px 20px 0;
  display: flex;
  background-color: #ffffff;
  color: #CCCCCC;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 14px;
  z-index: 5;
  &__item {
    position: relative;
    width: 100%;
    margin-right: 14px;
  }
  &__type {
    max-width:  100px;
  }
  &__query {
    max-width:  530px;
    &-input {
      box-shadow: inset 0 0 2px 1px #B5B5B5;
      border-radius: 3px;
      width: 100%;
      height: 100%;
      padding: 0 10px;
    }
    &-input:hover {
      box-shadow: inset 0 0 2px 1px #7B61FF;
    }
  }
  &__user {
    max-width:  180px;
  }
  &__status {
    max-width:  120px;
  }
  &__priority {
    max-width:  120px;
  }
  &__btn {
    max-width:  120px;
    width: 100%;
  }
}
</style>