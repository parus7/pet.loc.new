<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapState } from "pinia";

import IconGift from "./icons/IconGift.vue";
import IconOtel from "./icons/IconOtel.vue";
import IconFood from "./icons/IconFood.vue";
</script>

<template>
  <div class="bar relative">
    <button
      aria-label="напоминание о сотрудниках, рожденных сегодня"
      class="button-icon relative"
    >
      <IconGift />
      <span v-if="(visible = getVisibleAlertBirthday())" class="bar__alert">
        {{ onGetAlertBirthday() }}
      </span>
    </button>

    <button aria-label="ближайшие к офису отели" class="button-icon">
      <IconOtel />
    </button>
    <button aria-label="билжайшие к офису кафе и рестораны" class="button-icon">
      <IconFood />
    </button>
  </div>
</template>

<script>
export default {
  components: { IconGift, IconOtel, IconFood },

  data() {
    return {
      visible: false,
    };
  },

  computed: {
    ...mapState(useEmplStore, ["getAlertBirthday"]),
  },

  methods: {
    getVisibleAlertBirthday() {
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
  display: inline-flex;
  flex-direction: column;
  gap: 50px;

  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 8px;
  padding: 75px 4px;
}

.bar__alert {
  position: absolute;
  left: 25px;
  bottom: 16px;

  width: 14px;
  height: 14px;
  font-size: 0.6rem;
  color: var(--vt-c-white);

  background-color: var(--vt-c-alert);
  border-radius: 75%;
}

@media (max-width: 767px) {
  .bar {
    flex-direction: row;
    justify-content: center;
    gap: 100px;
    padding: 5px 0;
  }
}
</style>
