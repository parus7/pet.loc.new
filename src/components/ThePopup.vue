<script setup>
import TheButton from "./TheButton.vue";
</script>

<template>
  <div v-if="isOpen" class="popup" @click="closePopup">
    <div class="popup__body" @click.stop>
      <span>
        <p>Внимание!</p>
        <slot></slot>
      </span>

      <div class="container__button">
        <TheButton
          class="popup__botton"
          aria-label="подтверждение действия"
          @click="okPopup"
        >
          &nbsp;Да&nbsp;
        </TheButton>

        <TheButton
          type="button"
          class="popup__botton"
          aria-label="отмены действия"
          @click="closePopup"
        >
          Нет
        </TheButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: { TheButton },
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
  z-index: 111;
}
.popup__body {
  position: absolute;
  top: 30%;
  right: 30%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  background: var(--vt-c-white);
  border-radius: 20px;
  padding: 20px;
}

.popup__botton {
  line-height: 2;
}
</style>
