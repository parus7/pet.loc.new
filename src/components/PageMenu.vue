<template>
  <div class="wrapper">
    <transition-group name="animation">
      <ul class="menu" v-if="isSettings">

        <IconClose
          class="menu__close"
          @click="closeMenu" />

        <li class="menu__item">
          <PageButton>
            <IconTooltip />
          </PageButton>
          <p>Удалить подсказки</p>
        </li>

        <li class="menu__item">
          <PageButton @click="toggleColorTheme">
            <span v-show="isColorTheme">
              <IconSun />
            </span>

            <span v-show="!isColorTheme">
              <IconMoon />
            </span>
          </PageButton>
          <p> Смена цветовой темы</p>
        </li>

      </ul>
    </transition-group>
  </div>
</template>

<script>
import IconTooltip from "@/components/icons/IconTooltip.vue";
import IconSun from "@/components/icons/IconSun.vue";
import IconMoon from "@/components/icons/IconMoon.vue";
import PageButton from "@/components/UI/PageButton.vue";
import IconClose from "@/components/icons/IconClose.vue";

export default {
  name: "PageMenu.vue",

  components: { IconTooltip, IconSun, IconMoon, PageButton, IconClose },
  props: {
    isSettings: Boolean
  },

  data() {
    return {
      isColorTheme: false
    };
  },

  methods: {
    closeMenu() {
      this.$emit("close");
    },

    toggleColorTheme() {
      this.isColorTheme = !this.isColorTheme;
    }
  }
};
</script>

<style scoped>
.menu {
  position: absolute;
  bottom: 90px;
  right: 20px;

  width: 220px;
  background: var(--vt-c-white);
  box-shadow: 0 5px 20px var(--vt-c-grey-silver);
  border-radius: 20px;
  padding: 30px;
}

.menu__item {
  display: flex;
  align-items: center;
  gap: 10px;
  list-style: none;
  padding: 5px 10px;
}

.menu__close {
  position: absolute;
  top: 10px;
  right: 10px;
}

@media screen and  (max-width: 425px) {
  .menu {
    right: -10px;
  }
}
</style>