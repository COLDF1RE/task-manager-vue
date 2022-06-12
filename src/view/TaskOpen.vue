<template>
  <div class="main">

    <BoardHeader>
      <template #title>
        <h1 class="board-header__info-title">{{ currentTask.title }}
          <span><Status :status="currentTask.status" style="display: inline"/></span>
        </h1>
      </template>
      <template #options>

        <MyButton
            v-if="currentTask.status === 'opened'"
            v-for="item in opened"
            @click="changeStatusTask"
            :key="item.value"
            :value="item.value"
            class="board-header__options-btn button--default"
        >
          {{ item.name }}
        </MyButton>

        <MyButton
            v-if="currentTask.status === 'inProgress'"
            v-for="item in inProgress"
            @click="changeStatusTask"
            :key="item.value"
            :value="item.value"
            class="board-header__options-btn button--default"
        >
          {{ item.name }}
        </MyButton>

        <MyButton
            v-if="currentTask.status === 'testing'"
            v-for="item in testing"
            @click="changeStatusTask"
            :key="item.value"
            :value="item.value"
            class="board-header__options-btn button--default"
        >
          {{ item.name }}
        </MyButton>

        <MyButton
            v-if="currentTask.status === 'complete'"
            v-for="item in complete"
            @click="changeStatusTask"
            :key="item.value"
            :value="item.value"
            class="board-header__options-btn button--default"
        >
          {{ item.name }}
        </MyButton>

        <MyButton
            v-if="currentTask.userId === userId"
            @click="$router.push('/tasks/event/' + $route.params.id)"
            class="board-header__options-btn button--primary"
        >
          Редактировать
        </MyButton>

        <MyButton
            v-if="currentTask.userId === userId"
            @click="deleteTask"
            class="board-header__options-btn button button--error"
        >
          Удалить
        </MyButton>

      </template>
    </BoardHeader>


    <Board>
      <div class="task-open">
        <div class="task-open__info">
          <h4 class="task-open__info-title">Исполнитель</h4>
          <p class="task-open__info-text">
            {{ getUserName(currentTask.assignedId) !== undefined ? getUserName(currentTask.assignedId).username : '' }}
          </p>

          <h4 class="task-open__info-title">Автор задачи</h4>
          <p class="task-open__info-text">
            {{ getUserName(currentTask.userId) !== undefined ? getUserName(currentTask.userId).username : '' }}
          </p>

          <h4 class="task-open__info-title">Тип запроса</h4>
          <p class="task-open__info-text">
            {{ (currentTask.type === 'bug' && 'Ошибка') || (currentTask.type === 'task' && 'Задача') }}
          </p>

          <h4 class="task-open__info-title">Приоритет</h4>
          <p class="task-open__info-text">
            {{
              (currentTask.rank === 'low' && 'Низкий') || (currentTask.rank === 'medium' && 'Средний') || (currentTask.rank === 'high' && 'Высокий')
            }}
          </p>

          <h4 class="task-open__info-title">Дата создания</h4>
          <p class="task-open__info-text">{{ dateOfCreation }}</p>
          <h4 class="task-open__info-title">Дата изменения</h4>
          <p class="task-open__info-text">{{ dateOfUpdate }}</p>
          <h4 class="task-open__info-title">Затрачено времени</h4>
          <p class="task-open__info-text">{{ timeIsSpent }}</p>

          <MyButton class="task-open__info-bnt button--primary"
                    @click="setModalActive(true)"
          >
            Сделать запись о работе
          </MyButton>

        </div>

        <div class="task-open__description">
          <h4 class="task-open__description-title">Описание</h4>
          <p class="task-open__description-text">{{ currentTask.description }}</p>
        </div>

        <div class="task-open__comments">
          <h4 class="task-open__comments-title">{{ `Комментарии (${comments.length})` }}</h4>
          <form>
            <MyTextarea v-model="commentForm.text" class="task-open__comments-textarea"/>
            <MyButton @click="handleCommentSubmit" class="task-open__comments-btn button--success">Добавить комментарий</MyButton>
          </form>

          <div class="task-open__comments-wrapper">
<!--        <Comment v-for="comment in comments" :users="users" :comment="comment" :key="comment.id" class="task-open__comments-item"/>-->
            <div v-for="comment in comments" :key="comment.id" class="comment">
              <div class="comment__header">
                <h4 class="comment__header-username">
                  {{ `${getUserName(comment.userId).username} (${getDateOfCreationComment(comment.dateOfCreation)})`}}
                </h4>
                <button v-if="comment.userId === userId" @click="handleDeleteComment(comment.id)" class="comment__header-button">Удалить</button>
              </div>
              <p class="comment__text">{{ comment.text }}</p>
            </div>
          </div>

        </div>
      </div>
    </Board>

    <!--    <Modal modalActive={modalActive} setModalActive={setModalActive}>-->
    <!--      <form className="" onSubmit={handleSubmit}>-->
    <!--        <h2 className="modal__window-title">Запись о работе</h2>-->
    <!--        <div className="modal__window-body">-->

    <!--          <label htmlFor="timeInMinutes" className="modal__window-subtitle">Затраченное время</label>-->
    <!--          <input-->
    <!--              id="timeInMinutes"-->
    <!--              className="modal__window-input"-->
    <!--              onChange={handleFieldChangeWorktime}-->
    <!--              name="timeInMinutes"-->
    <!--              value={worktimeForm.timeInMinutes}-->
    <!--              required-->
    <!--              type="number"-->
    <!--          />-->

    <!--          <label htmlFor='measureUnit' className="modal__window-subtitle">Единицы измерения</label>-->
    <!--          <Dropdown change={handleFieldChangeWorktime} form={worktimeForm} values={measureUnit} title={measureUnitTitle} clickInsideCloseMenu={true} inputType={'radio'} className={'modal__window-select'}/>-->

    <!--            <label htmlFor='comment' className="modal__window-subtitle">Комментарии</label>-->
    <!--            <textarea-->
    <!--                id="comment"-->
    <!--                className="modal__window-textarea"-->
    <!--                onChange={handleFieldChangeWorktime}-->
    <!--                name="comment"-->
    <!--                value={worktimeForm.comment}-->
    <!--                required-->
    <!--            />-->
    <!--        </div>-->
    <!--        <div className="modal__window-buttons">-->
    <!--          <button type="submit" className="modal__window-submit button button&#45;&#45;primary">Добавить</button>-->
    <!--          <button className="modal__window-cancel button button-default"-->
    <!--                  onClick={() => setModalActive(false)}>Отмена-->
    <!--          </button>-->
    <!--        </div>-->
    <!--      </form>-->
    <!--    </Modal>-->
  </div>
</template>


<script>
import BoardHeader from "../components/BoardHeader";
import Status from "../components/UI/Status";
import MyButton from "../components/UI/MyButton";
import {mapActions, mapGetters} from "vuex";
import moment from "moment";
import "moment/locale/ru";
import MyTextarea from "../components/UI/MyTextarea";
import Board from "../components/UI/Board";


export default {
  components: {Board, MyTextarea, MyButton, Status, BoardHeader},
  data() {
    return {
      currentTask: [],
      userId: localStorage.getItem('userId'),

      opened: [{value: 'inProgress', name: 'Взять в работу'}, {value: 'complete', name: 'Отметить как выполненное'}],
      inProgress: [{value: 'opened', name: 'Заново открыть'}, {value: 'testing',name: 'Взять на тестирование'}, {value: 'complete', name: 'Отметить как выполненное'}],
      testing: [{value: 'opened', name: 'Заново открыть'}, {value: 'complete', name: 'Отметить как выполненное'}],
      complete: [{value: 'opened', name: 'Заново открыть'}],

      measureUnit: [{value: 'minutes', name: 'Минуты'}, {value: 'hours', name: 'Часы'}, {value: 'days', name: 'Дни'},],
      measureUnitTitle: {defaultName: 'Выбрать', name: 'measureUnit'},

      dateOfCreation: '',
      dateOfUpdate: '',
      timeIsSpent: '',

      comments: [],

      modal: '',

      worktimeForm: {
        timeInMinutes: 0,
        comment: "",
        currentUser: localStorage.getItem('userId'),
        measureUnit: '',
      },
      commentForm: {
        taskId: this.$route.params.id,
        userId: localStorage.getItem('userId'),
        text: '',
      }
    }
  },

  mounted() {
    this.fetchUsers()
    this.getCurrentTask()
    this.getComments()
    this.setActiveTab('tasks')
  },

  watch: {
    currentTask(){
      this.dateOfCreation = moment(this.currentTask.dateOfCreation).format('DD.MM.YYYY HH:mm')
      this.dateOfUpdate = moment(this.currentTask.dateOfUpdate).format('DD.MM.YYYY HH:mm')
      this.timeIsSpent = this.minutesToDHM(this.currentTask.timeInMinutes)
    },
  },

  computed: {
    ...mapGetters(['loading', 'tasks', 'users'])
  },

  methods: {
    ...mapActions(['fetchTasks', 'fetchUsers', 'setActiveTab']),
    getUserName(UserId) {
      let username = this.users.find(user => user.id === UserId)
      return username
    },

    getCurrentTask(){
      this.$api.Events.getCurrentTask(this.$route.params.id)
          .then((data) => {
            this.currentTask = data.data
          })
    },


    //BOARD-HEADER
    async changeStatusTask(evt) {
      const status = evt.target.value
      await this.$api.Events.changeStatusTask(this.$route.params.id, status)
      await this.getCurrentTask()
    },
    async deleteTask() {
      await this.$api.Events.deleteTask(this.$route.params.id)
      await this.$router.back()
    },


    // COMMENTS
    getComments(){
      this.$api.Events.getComments(this.$route.params.id)
          .then((data) => {
            this.comments = data.data
          })
    },
    async handleCommentSubmit(evt) {
      evt.preventDefault()
      await this.$api.Events.createOrEditComment(this.commentForm)
      await this.getComments()
      this.commentForm.text = ''
    },
    async handleDeleteComment(commentId) {
      await this.$api.Events.deleteComment(commentId)
      await this.getComments()
    },
    getDateOfCreationComment(dateOfCreation) {
      return moment(dateOfCreation).format('DD.MM.YY HH:mm')
    },


    // WORKTIME-MODAL
    handleFieldChangeWorktime(evt) {
      const {name, value} = evt.target
      this.worktimeForm = ({...this.worktimeForm, [name]: value})
    },
    async handleSubmit(evt) {
      evt.preventDefault()
      await events.changeWorkTimeTask(id, {
        timeInMinutes: worktimeForm.measureUnit === 'days' && worktimeForm.timeInMinutes * 1440 || worktimeForm.measureUnit === 'hours' && worktimeForm.timeInMinutes * 60 || worktimeForm.timeInMinutes,
        comment: worktimeForm.comment,
        currentUser: worktimeForm.currentUser,
      })
      await events.getComments(id)
      setModalActive(false)
      setWorktimeForm({
        timeInMinutes: 0,
        comment: "",
        currentUser: localStorage.getItem('userId'),
        measureUnit: '',
      })
    },

    minutesToDHM(time) {
      moment.relativeTimeThreshold('m', 60)
      moment.relativeTimeThreshold('h', 24)
      moment.relativeTimeThreshold('s', 60)

      const duration = moment.duration(time, 'minutes');

      const days = duration.days()
      const hours = duration.hours()
      const minutes = duration.minutes()

      const daysHumanize = moment.duration(days, 'days').humanize();
      const hoursHumanize = moment.duration(hours, 'hours').humanize();
      const minutesHumanize = moment.duration(minutes, 'minutes').humanize();

      const dDisplay = days > 0 ? (days === 1 ? `1 ${daysHumanize}` : daysHumanize) : "";
      const hDisplay = hours > 0 ? (hours === 1 ? `1 ${hoursHumanize}` : hoursHumanize) : "0 часов";
      const mDisplay = minutes > 0 ? (minutes === 1 ? `1 ${minutesHumanize}` : minutesHumanize) : "0 минут";

      return `${dDisplay} ${hDisplay} ${mDisplay}`
    }
  }
}
</script>


<style lang="scss" scoped>
.task-open {
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 20px 0;
  height: 100%;
  border-radius: 5px;
  &__info {
    max-width: 300px;
    width: 100%;
    padding: 0 20px;
    flex: 1;
    &-title {
      margin-bottom: 5px;
      color: #CCCCCC;
    }
    &-text {
      margin-bottom: 20px;
    }
    &-text:last-child {
      margin-bottom: 5px;
    }
    &-bnt {}
  }
  &__description {
    max-width: 500px;
    width: 100%;
    flex: 2;
    padding: 0 20px;
    border-left: 1px solid #B5B5B5;
    border-right: 1px solid #B5B5B5;
    &-title {
      color: #CCCCCC;
      margin-bottom: 5px;
    }
    &-text {
      text-indent: 20px;
      margin-bottom: 5px;
      overflow: auto;
      height: 700px;
    }
    &-text:last-child {
      margin-bottom: 0;
    }
  }
  &__comments {
    padding: 0 20px;
    flex: 1;
    &-title {
      color: #CCCCCC;
      margin-bottom: 5px;
    }
    &-textarea {
      //box-shadow: inset 0 0 2px 1px #B5B5B5;
      //border-radius: 3px;
      //width: 100%;
      height: 75px;
      margin-bottom: 10px;
    }
    &-btn {
      margin-bottom: 20px;
    }
    &-item {
    }
    &-wrapper {
      overflow: auto;
      height: 570px;
      padding-right: 10px;
    }
  }
}
.comment{
  &__header{
    display: flex;
    justify-content: space-between;
    align-items: self-start;
    &-username{
      color: #CCCCCC;
      margin-bottom: 5px;
    }
    &-button{
      color: #FF6161;
      background-color: transparent;
    }
  }
  &__text{
    margin-bottom: 20px;
  }
}
</style>