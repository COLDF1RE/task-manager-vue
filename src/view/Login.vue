<template>
  <div class="main">
    <form class="login" >
      <div class="login__title">Авторизация</div>
      <label class="login__input-title">Логин</label>
      <MyInput v-model="form.login" required type="text" class="login__input"/>
      <label class="login__input-title">Пароль</label>
      <MyInput v-model="form.password" required type="password" class="login__input"/>
      <MyButton @click="handleSubmit" class="login__btn button--success">Вход</MyButton>
    </form>
  </div>
</template>

<script>
import MyInput from "../components/UI/MyInput";
import MyButton from "../components/UI/MyButton";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {MyButton, MyInput},
  data(){
    return {
      form: {
        login: '',
        password: '',
      }
    }
  },
  computed: {
    ...mapGetters(['auth'])
  },
  methods: {
    ...mapActions(['setAuth', 'setCurrentLogin']),
    handleSubmit () {
      this.$api.Events.login(this.form)
          .then((data) => {
            if(data.status === 200){
              this.setAuth(true)
              localStorage.setItem('auth', 'true')
              localStorage.setItem('userId', data.data.id)
              localStorage.setItem('username', data.data.username)
              localStorage.setItem('userPhotoUrl', data.data.photoUrl)
              this.$router.push('/tasks')
            }
          })
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  padding: 30px;
  min-width: 300px;
  min-height: 288px;
  background-color: #ffffff;
  box-shadow: 0 0 5px 3px #B5B5B5;
  border-radius: 5px;
  position: absolute;
  left: calc(50% - 300px / 2);
  top: calc(50% - 288px / 2);
  &__title {
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 20px;
    text-align: center;
  }
  &__input-title {
    margin-bottom: 5px;
    color: #cccccc;
  }
  &__input {
    margin-bottom: 20px;
  }
  &__btn {
    margin-top: 20px;
    display: block;
    width: 100%;
  }
}
</style>