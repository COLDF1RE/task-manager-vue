<template>
  <div class="comment">
    <div class="comment__header">
      <h4 class="comment__header-username">
        {{ `${getUserName(comment.userId).username} (${dateOfCreation})`}}
      </h4>
      <button v-if="comment.userId === userId" @click="handleDeleteComment" class="comment__header-button">Удалить</button>
    </div>
    <p class="comment__text">{{ comment.text }}</p>
  </div>
</template>


<script>
import moment from "moment";
export default {
  props: {
    comment: {
      type: Object,
    },
    users: {
      type: Array,
    }
  },
  data(){
    return {
      userId: localStorage.getItem('userId'),
      dateOfCreation: '',
      username:'',
    }
  },
  mounted() {
    this.getDateOfCreation()
  },
  methods: {
    async handleDeleteComment(evt) {
      evt.preventDefault()
      await this.$api.Events.deleteComment(this.comment.id)
      // await this.$api.Events.getComments(this.$route.params.id)
      //     .then((data) => {
      //       this.comments = data.data
      //     })


      // await events.deleteComment(comment.id)
      // await events.getComments(comment.taskId)
    },
    getUserName(UserId) {
      let username = this.users.find(user => user.id === UserId)
      return username
    },
    getDateOfCreation() {
      this.dateOfCreation = moment(this.comment.dateOfCreation).format('DD.MM.YY HH:mm')
    },
  }
}
</script>


<style lang="scss" scoped>
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