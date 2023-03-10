<template>
  <div v-if="isOpen" class="popup" @click="closePopup">
    <div class="popup__body" @click.stop>
      <span>
        <p>Внимание!</p>
        <slot></slot>
      </span>

      <div class="container__button">
        <button
          class="button popup__botton"
          aria-label="подтверждение действия"
          @click="okPopup"
        >
          &nbsp;Да&nbsp;
        </button>
        <button
          class="button popup__botton"
          aria-label="отмены действия"
          @click="closePopup"
        >
          Нет
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
}
.popup__body {
  position: absolute;
  top: 30%;
  right: 15%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  background: var(--vt-c-white);
  border-radius: 20px;
  padding: 20px;
}

.popup__botton {
  line-height: 1.9;
}
</style>
