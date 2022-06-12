<template>
  <div class="ui-page">
    <h1 class="ui-page__title">UI TEST</h1>

    <h2 class="ui-page__subtitle">MyButton:</h2>
    <MyButton class="button--default">default</MyButton>
    <MyButton class="button--primary">primary</MyButton>
    <MyButton class="button--success">success</MyButton>
    <MyButton class="button--error">error</MyButton>
    <MyButton class="button--disabled">disabled</MyButton>

    <h2 class="ui-page__subtitle">Rank:</h2>
    <Rank rank="low"/>
    <Rank rank="medium"/>
    <Rank rank="high"/>

    <h2 class="ui-page__subtitle">Status:</h2>
    <Status status="opened"/>
    <Status status="inProgress"/>
    <Status status="testing"/>
    <Status status="complete"/>

    <h2 class="ui-page__subtitle">MyInput: {{ test1 }}</h2>
    <MyInput v-model="test1" placeholder="Введите текст"/>

    <h2 class="ui-page__subtitle">MyTextarea: {{ test2 }}</h2>
    <MyTextarea v-model="test2" placeholder="Введите текст"/>

    <h2 class="ui-page__subtitle">Checkbox: {{ formFilter.type }}</h2>
    <Checkbox v-for="[key, value] in Object.entries(type)"
                  :key="key"
                  :value="key"
                  :title="value"
                  :checkedItems="formFilter.type"
                  @change="setFormFilter"
    />

    <h2 class="ui-page__subtitle">Dropdown:</h2>
    <Dropdown>
      <template #title>
        Название
      </template>
      <template #list>
        <div class="dropdown__list-item">1</div>
        <div class="dropdown__list-item">2</div>
        <div class="dropdown__list-item">3</div>
      </template>
    </Dropdown>

    <h2 class="ui-page__subtitle">Dropdown with checkbox:</h2>
    <Dropdown>
      <template #title>
<!--        {{formFilter.type.length === 0 ? 'Тип' : (formFilter.type.length === 1 ? type[formFilter.type] : `Выбрано: ${formFilter.type.length}`)}}-->
        {{ getDropdownTitle(formFilter.type, 'Тип', type) }}
      </template>
      <template #list>
        <Checkbox v-for="[key, value] in Object.entries(type)"
                      :key="key"
                      :value="key"
                      :title="value"
                      :checkedItems="formFilter.type"
                      @change="setFormFilter"
        />
      </template>
    </Dropdown>


    <h2 class="ui-page__subtitle">Menu:</h2>
    <div style="position: relative; width: 136px">
      <svg @click="toggleMenuActive" class="task__btn-img" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      <Menu :menuActive="menuActive" style="top: 20px">
        <li>
          <a @click="$router.push('/users/' + localStorage.getItem('userId'))" class="menu__list-item">Посмотреть профиль</a>
        </li>
        <li>
          <button onClick={logout} class="menu__list-item">Выйти из системы</button>
        </li>
      </Menu>
    </div>



    <h2 class="ui-page__subtitle">Modal:</h2>
    <MyButton @click="toggleModal" class="button--default">Open Modal</MyButton>
    <Modal2
        v-show="isShowModal"
        :show="isShowModal"
        :scrollable="true"
        header-id="modalHeader"
        body-id="modalBody"
        @close="toggleModal"
    >
      <template #header>
        Заголовок
      </template>

      <template #body>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur debitis deserunt
          doloremque ducimus eum facilis iure labore laborum, odio officia optio pariatur, placeat
          quos rem, rerum sapiente sed temporibus velit.
        </p>
      </template>
    </Modal2>


    <h2 class="ui-page__subtitle">Pagination:</h2>
    <Pagination :page="page" :limit="limit" :total="total" :firstIndex="firstIndex" :lastIndex="lastIndex"/>
  </div>
</template>


<script>
import Pagination from "../components/UI/Pagination";
import MyTextarea from "../components/UI/MyTextarea";
import MyButton from "../components/UI/MyButton";
import Rank from "../components/UI/Rank";
import Status from "../components/UI/Status";
import MyInput from "../components/UI/MyInput";
import Menu from "../components/UI/Menu";
import Dropdown from "../components/UI/Dropdown";
import Checkbox from "../components/UI/Checkbox";
export default {
  components: {
    Checkbox, Dropdown, Menu, MyInput, Status, Rank, MyButton, MyTextarea, Pagination},
  data() {
    return{
      type: {
        bug: "Ошибка",
        task: "Задача"
      },
      formFilter: {
        type: []
      },

      // MyInput
      test1: '',
      // MyTextarea
      test2: '',

      //Menu
      menuActive: false,

      //Modal
      isShowModal: false,
      isTaskLoading: false,

      //Pagination
      page: 1,
      limit: 5,
      total: 15,
      totalPages: 3,
      firstIndex: 0,
      lastIndex: 10,
    }
  },

  mounted() {
    console.log(Object.keys(this.objArr))
  },


  methods: {
    //Modal
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },

    //Menu
    toggleMenuActive() {
      this.menuActive = !this.menuActive
    },

    //textCheckbox
    setFormFilter(value) {
      this.formFilter.type = value
    },

    //Dropdown with checkbox & title
// {{formFilter.type.length === 0 ? 'Тип' : (formFilter.type.length === 1 ? type[formFilter.type] : `Выбрано: ${formFilter.type.length}`)}}
    getDropdownTitle (arr, defaultTitle, constsObj) {
      if (arr.length === 0) {
        return defaultTitle
      } else if (arr.length === 1){
        return constsObj[arr]
      } else {
        return `Выбрано: ${arr.length}`
      }
    }
}
}
</script>


<style lang="scss" scoped>
.ui-page {
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  background-color: #E5E5E5;
  padding: 50px;

  &__title {
    margin: 20px 0 5px;
    font-size: 25px;
    text-align: center;
    font-weight: 700;
  }

  &__subtitle {
    margin: 40px 0 10px;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>