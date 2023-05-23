<template>
  <div v-if="isOpen" class="popup" @click="closePopup">
    <div class="popup__body" @click.stop>
      Внимание!
      <span>
          <slot name="popupText"></slot>
      </span>

      <div class="popup__wrapper">
        <PageColorButton
          class="popup__button"
          aria-label="подтверждение действия"
          @click="okPopup"
        >
          &nbsp;Да&nbsp;
        </PageColorButton>

        <PageColorButton
          class="popup__button"
          aria-label="отмены действия"
          @click="closePopup"
        >
          Нет
        </PageColorButton>
      </div>
    </div>
  </div>
</template>

<script>
import PageColorButton from "./UI/PageColorButton.vue";

export default {
  name: "PagePopup",

  components: { PageColorButton },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    closePopup() {
      this.$emit("close");
    },

    okPopup() {
      this.$emit("ok");
    }
  }
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
  z-index: 111;
}

.popup__body {
  position: absolute;
  top: 30%;
  right: 30%;

  display: flex;
  flex-direction: column;
  gap: 30px;

  width: 220px;
  background: var(--vt-c-white);
  border-radius: 20px;
  padding: 20px;
}

.popup__wrapper {
  display: flex;
  justify-content: space-around;
}

.popup__button {
  line-height: 1.9;
}

@media (max-width: 425px) {
  .popup__body {
    right: 15%;
  }
}
</style>
