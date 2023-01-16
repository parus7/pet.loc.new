<template>
  <div v-if="isOpen" class="popup-container" @click="closePopup">
    <div class="popup" @click.stop>
      <span class="slot_text">
        <p>Внимание!</p>
        <slot :close="close" confirm="confirm"></slot>
      </span>

      <div class="container-button">
        <button class="button" @click="closePopup">Отмена</button>
        <button class="button" @click="okPopup">Ok</button>
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
  emits: {
    ok: null,
    close: null,
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
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--vt-c-white-background-confirm);
  z-index: 10;
}
.popup {
  position: absolute;
  top: 30%;
  right: 10%;
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
