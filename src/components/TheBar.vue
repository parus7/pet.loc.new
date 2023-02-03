<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapActions } from "pinia";

import IconGift from "./icons/IconGift.vue";
import IconOtel from "./icons/IconOtel.vue";
import IconBurger from "./icons/IconBurger.vue";
</script>

<template>
  <div class="container_bar">
    <button class="button-icon button-icon-bar"><IconGift /></button>
    <button class="button-icon button-icon-bar"><IconOtel /></button>
    <button class="button-icon button-icon-bar"><IconBurger /></button>
  </div>
</template>

<script>
export default {
  components: { IconGift, IconOtel, IconBurger },

  //   data() {
  //     return {};
  //   },

  methods: {
    ...mapActions(useEmplStore, [""]),
  },
};
</script>

<style scoped>
.container_bar {
  display: flex;
  flex-direction: column;

  grid-column: 1 / 2;
  grid-row: 2 / 3;
  gap: 20px;

  background-color: var(--vt-c-white-mute);
  border-radius: 8px;
  padding: 25px 15px;
  margin: 0;
}

.button-icon-bar {
  position: relative;
}

.button-icon::after {
  position: absolute;
  left: 15px;
  bottom: 10px;
  content: "3";
  /* content: attr(data-name); */
  font-size: 0.6rem;
  color: var(--vt-c-white);

  width: 6px;
  height: 6px;
  background-color: var(--vt-c-alert);
  border-radius: 50%;
  padding: 5px 6px;
}
</style>
