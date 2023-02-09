<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapState } from "pinia";

import IconGift from "./icons/IconGift.vue";
import IconOtel from "./icons/IconOtel.vue";
import IconBurger from "./icons/IconBurger.vue";
</script>

<template>
  <div class="bar">
    <button class="button-icon relative">
      <IconGift />
      <span v-if="(visible = getVisible())" class="bar__alert">
        {{ onGetAlertBirthday() }}
      </span>
    </button>

    <button class="button-icon"><IconOtel /></button>
    <button class="button-icon"><IconBurger /></button>
  </div>
</template>

<script>
export default {
  components: { IconGift, IconOtel, IconBurger },

  data() {
    return {
      visible: false,
    };
  },

  computed: {
    ...mapState(useEmplStore, ["getAlertBirthday"]),
  },

  methods: {
    getVisible() {
      return this.onGetAlertBirthday() >= 1 ? true : false;
    },

    onGetAlertBirthday() {
      return this.getAlertBirthday(this.getTodayDate());
    },

    getTodayDate() {
      let day = String(new Date().getDate());
      day.length === 1 ? (day = "0" + day) : day;

      let month = String(new Date().getMonth() + 1);
      month.length === 1 ? (month = "0" + month) : month;

      return day + month;
    },
  },
};
</script>

<style scoped>
.bar {
  display: flex;
  flex-direction: column;
  vertical-align: center;

  grid-column: 1 / 2;
  grid-row: 2 / 3;
  gap: 35px;

  background-color: var(--vt-c-white-mute);
  border-radius: 8px;
  padding: 25px 0;
  margin: 0;
}

.bar__alert {
  position: absolute;
  left: 19px;
  bottom: 10px;
  font-size: 0.6rem;
  color: var(--vt-c-white);
  width: 15px;
  height: 15px;
  vertical-align: center;
  background-color: var(--vt-c-alert);
  border-radius: 50%;
  padding: 3px;
}
</style>
