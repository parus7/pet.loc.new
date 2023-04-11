<template>
  <div class="bar relative">

    <RouterLink :to="{ name: 'birthday' }" tabindex="-1">
      <div class="help relative" data-name="др сегодня">
        <TheIconButton
          aria-label="напоминание о сотрудниках, рожденных сегодня"
          class="relative"
        >
          <IconGift />
          <span v-if="onGetAlertBirthday >= 1" class="bar__alert">
          {{ onGetAlertBirthday }}
        </span>
        </TheIconButton>
      </div>
    </RouterLink>

    <RouterLink :to="{ name: 'archive' }" tabindex="-1">
      <div class="help relative" data-name="архивный список">
        <TheIconButton aria-label="архивный список сотрудников">
          <IconArchive />
        </TheIconButton>
      </div>
    </RouterLink>

    <div class="help relative" data-name="кафе рядом">
      <TheIconButton aria-label="ближайшие к офису кафе">
        <IconFood />
      </TheIconButton>
    </div>
  </div>
</template>

<script>
import { useEmplStore } from "@/stores/EmplStore";
import { mapState, mapActions } from "pinia";

import IconGift from "./icons/IconGift.vue";
import IconFood from "./icons/IconFood.vue";
import IconArchive from "./icons/IconArchive.vue";

import TheIconButton from "./UI/TheIconButton.vue";

export default {
  components: { IconGift, IconFood, IconArchive, TheIconButton },

  computed: {
    ...mapState(useEmplStore, ["getAlertBirthday"]),

    onGetAlertBirthday() {
      return this.getAlertBirthday("employees", this.getTodayDate()).length;
    }
  },

  methods: {
    ...mapActions(useEmplStore, ["getTodayDate"])
  }
};
</script>

<style scoped>
.bar {
  display: flex;
  flex-direction: column;
  gap: 12%;

  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 8px;
  padding: 80px 12px;
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
    gap: 16%;
    padding: 15px 0;
  }
}
</style>
