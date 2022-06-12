<template>
  <div class="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import {mapActions} from "vuex";
export default {
  components: {Footer, Header},
  methods: {
    ...mapActions(['setAuth']),
    isAuth() {
      if (localStorage.getItem('auth')) {
        this.setAuth(true)
      }
    }
  },
  mounted() {
    this.isAuth()
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
  }
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    max-width: 1920px;
    min-width: 320px;
  }
  .main {
    flex: 1 0 auto;
  }
  .footer {
    flex: 0 0 auto;
  }
</style>
