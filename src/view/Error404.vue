<template>
  <div class="main">
  <div class="error404">
    <h2 class="error404__title">Упс!</h2>
    <h4 class="error404__subtitle">Похоже, это не то, что вы искали.</h4>
    <a @click="$router.push($store.state.app.auth ? 'tasks' : 'login')" class="error404__link">Вернуться на <span>{{ $store.state.app.auth ? 'главную' : 'страницу авторизации' }}</span></a>
  </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.error404 {
  height: 80vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  color: #B5B5B5;
  &__title {
    font-size: 44px;
    margin-bottom: 20px;
  }
  &__subtitle {
    margin-bottom: 20px;
  }
  &__link {
    color: #7B61FF;
  }
}
</style>