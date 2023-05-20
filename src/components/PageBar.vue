<template>
  <div class="bar relative">

    <div class="help relative" data-name="др сегодня">
      <PageIconButton
        aria-label="др сегодня"
        class=" not-active"
        tabindex="-1"
      >
        <IconGift />
        <span v-if="length >= 1" class="bar__alert">
                    {{ length }}
                  </span>

      </PageIconButton>
    </div>

    <RouterLink :to="{ name: 'archive' }" tabindex="-1">
      <div class="help relative" data-name="перейти в&nbsp;архив">
        <PageIconButton aria-label="перейти в архив">
          <IconArchive />
        </PageIconButton>
      </div>
    </RouterLink>

    <RouterLink :to="{ name: 'food' }" tabindex="-1">
      <div class="help relative" data-name="кафе рядом">
        <PageIconButton
          aria-label="кафе рядом"
        >
          <IconFood />
        </PageIconButton>
      </div>
    </RouterLink>
  </div>
</template>

<script>
import IconGift from "./icons/IconGift.vue";
import IconFood from "./icons/IconFood.vue";
import IconArchive from "./icons/IconArchive.vue";

import PageIconButton from "./UI/PageIconButton.vue";

export default {
  components: { IconGift, IconFood, IconArchive, PageIconButton },

  props: {
    length: Number
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

.not-active:hover,
.not-active:active {
  box-shadow: 1px 1px 0 0 var(--vt-c-active-2);
}

@media screen and (max-width: 991px) {
  .bar {
    flex-direction: row;
    justify-content: center;
    gap: 16%;
    padding: 10px 0;
  }
}
</style>
