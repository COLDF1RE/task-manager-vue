<template>
  <div v-if="show" class="modal modal--active" @click.self="closeModal">
    <div class="modal__window">
      <slot></slot>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    modalVisible: {
      type: Boolean,
    },
    test: {
      type: Boolean,
    }
  },
  mounted() {
    window.addEventListener('keydown', this.escCloseModal);
  },
  destroy() {
    window.removeEventListener('keydown', this.escCloseModal);
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    escCloseModal(e) {
      if (this.show && e.key === 'Escape') {
        this.closeModal();
      }
    },
  },
}
</script>


<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(181, 181, 181, 0.35);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0);
  z-index: 10;
  &--active {
    transform: scale(1);
  }
  &__window {
    background-color: #ffffff;
    max-width: 440px;
    width: 100%;
    border-radius: 5px;
    &-title {
      font-size: 20px;
      line-height: 23px;
      padding: 20px 30px;
    }
    &-body {
      border-top: 1px solid #B5B5B5;
      border-bottom: 1px solid #B5B5B5;
      padding: 20px 30px;
    }
    &-subtitle {
      color: #CCCCCC;
      margin-bottom: 10px;
    }
    &-input {
      box-shadow: inset 0 0 2px 1px #B5B5B5;
      border-radius: 3px;
      width: 100%;
      margin-bottom: 20px;
      height: 24px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 14px;
      padding: 5px 10px;
    }
    &-input:hover {
      box-shadow: inset 0 0 2px 1px #7B61FF;
    }
    &-select {
      border-radius: 3px;
      width: 100%;
      margin-bottom: 20px;
      height: 24px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 14px;
      position: relative;
    }
    &-textarea {
      box-shadow: inset 0 0 2px 1px #B5B5B5;
      border-radius: 3px;
      width: 100%;
      height: 76px;
      padding: 5px 10px;
    }
    &-textarea:hover {
      box-shadow: inset 0 0 2px 1px #7B61FF;
    }
    &-buttons {
      padding: 20px 30px;
    }
    &-submit {
      margin-right: 10px;
    }
    &-cancel {}
  }
}
</style>