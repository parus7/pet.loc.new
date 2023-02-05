<template>
  <div v-if="isOpen" class="popup" @click="closePopup">
    <div class="popup__body" @click.stop>
      <span>
        <p>Внимание!</p>
        <slot></slot>
      </span>

      <div class="container__button">
        <button
          class="button"
          aria-label="кнопка подтверждения действия"
          @click="okPopup"
        >
          Ok
        </button>
        <button
          class="button"
          aria-label="кнопка отмены действия"
          @click="closePopup"
        >
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    closePopup() {
      this.$emit("close");
    },

    okPopup() {
      this.$emit("ok");
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: var(--vt-c-white-background-confirm);
  z-index: 10;
}
.popup__body {
  position: absolute;
  top: 35%;
  right: 35%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 300px;
  height: auto;
  background: var(--vt-c-white);
  border-radius: 20px;
  padding: 20px;
  z-index: 11;
}
</style>
