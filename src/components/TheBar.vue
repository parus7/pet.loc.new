<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapState } from "pinia";
import { RouterLink } from "vue-router";

import IconGift from "./icons/IconGift.vue";
import IconOtel from "./icons/IconOtel.vue";
import IconFood from "./icons/IconFood.vue";
import IconArchive from "./icons/IconArchive.vue";

import TheIconButton from "../components/TheIconButton.vue";
</script>

<template>
  <div class="bar relative">
    <div class="help relative" data-name="др сегодня">
      <TheIconButton
        aria-label="напоминание о сотрудниках, рожденных сегодня"
        class="relative"
      >
        <IconGift />
        <span v-if="(visible = getVisibleAlertBirthday())" class="bar__alert">
          {{ onGetAlertBirthday() }}
        </span>
      </TheIconButton>
    </div>

    <div class="help relative" data-name="отели и гостиницы">
      <TheIconButton aria-label="ближайшие к офису отели">
        <IconOtel />
      </TheIconButton>
    </div>

    <div class="help relative" data-name="кафе и рестораны">
      <TheIconButton aria-label="билжайшие к офису кафе и рестораны">
        <IconFood />
      </TheIconButton>
    </div>

    <RouterLink :to="{ name: 'archive' }" tabindex="-1">
      <div class="help relative" data-name="архив сотрудников">
        <TheIconButton aria-label="архив сотрудников">
          <IconArchive />
        </TheIconButton>
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  components: { IconGift, IconOtel, IconFood, TheIconButton },

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
  display: flex;
  flex-direction: column;
  gap: 8%;

  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 8px;
  padding: 80px 20px;
}

.bar__alert {
  position: absolute;
  left: 25px;
  bottom: 16px;

  width: 12px;
  height: 12px;
  font-size: 0.6rem;
  color: var(--vt-c-white);

  background-color: var(--vt-c-alert);
  border-radius: 50%;
}

@media screen and (max-width: 991px) {
  .bar {
    flex-direction: row;
    justify-content: center;
    padding: 5px 0;
  }
}
</style>
