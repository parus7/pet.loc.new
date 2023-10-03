<template>
  <div class="bar relative">

    <span class="tooltip tooltip-position" data-name="напоминание&nbsp;о&nbsp;др&nbsp;сегодня">
      <PageButton
        aria-label="напоминание о др сегодня"
        class=" not-active"
        tabindex="-1"
      >
        <IconGift />
        <span v-if="amountBirthdays >= 1" class="bar__alert">
                    {{ amountBirthdays }}
                  </span>

      </PageButton>
    </span>

    <RouterLink :to="{ name: 'archive' }" tabindex="-1">
    <span class="tooltip tooltip-position" data-name="перейти&nbsp;в&nbsp;архив">
            <PageButton aria-label="перейти в архив">
              <IconArchive />
            </PageButton>
          </span>
    </RouterLink>

    <RouterLink :to="{ name: 'food' }" tabindex="-1">
      <span class="tooltip tooltip-position" data-name="посмотреть&nbsp;кафе&nbsp;рядом">
        <PageButton
          aria-label="кафе рядом"
        >
          <IconFood />
        </PageButton>
      </span>
    </RouterLink>
  </div>
</template>

<script>
import IconGift from "./icons/IconGift.vue";
import IconFood from "./icons/IconFood.vue";
import IconArchive from "./icons/IconArchive.vue";

import PageButton from "./UI/PageButton.vue";

export default {
  components: { IconGift, IconFood, IconArchive, PageButton },

  props: {
    amountBirthdays: Number
  }
};
</script>

<style scoped>
.bar {
  display: flex;
  justify-content: center;
  gap: 16%;

  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 8px;
  padding: 10px;
}

.bar__alert {
  position: absolute;
  left: 25px;
  bottom: 16px;

  width: 12px;
  height: 12px;
  font-size: 0.6rem;
  color: var(--vt-c-white);

  background-color: var(--vt-c-alert-7);
  border-radius: 50%;
}

.not-active:hover,
.not-active:active {
  box-shadow: 1px 1px 0 0 var(--vt-c-active-2);
}

.tooltip-position:hover::after {
  left: 0;
}
</style>
