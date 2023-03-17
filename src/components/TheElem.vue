<template>
  <template class="employee">
    <img
      class="employee__photo"
      :class="{ status: employee.hide }"
      :alt="`id: ${employee.id}`"
      :src="employee.src"
      width="35"
      height="35"
    />

    <input
      class="employee__cn input-mask"
      v-model="employee.cn"
      tabindex="-1"
      readonly
    />

    <input
      class="employee__item-email input-mask"
      v-model="employee.email"
      tabindex="-1"
      readonly
    />

    <input
      class="employee__item-telephone input-mask"
      type="text"
      aria-label="phone"
      v-model="employee.telephone"
      v-maska
      data-maska="##-##"
      tabindex="-1"
      readonly
    />

    <input
      class="employee__item-mobile input-mask"
      type="text"
      aria-label="mobile"
      v-model="employee.mobile"
      v-maska
      data-maska="### ###-##-##"
      tabindex="-1"
      readonly
    />

    <RouterLink
      :to="{
        name: 'card',
        params: { id: employee.id },
      }"
      tabindex="-1"
    >
      <div class="help relative" data-name="в&nbsp;профиль">
        <TheIconButton aria-label="переход в профиль сотрудника">
          <IconFullInfo />
        </TheIconButton>
      </div>
    </RouterLink>

    <div class="help relative" data-name="поместить в архив">
      <TheIconButton
        aria-label="поместить сотрудника в архив"
        @click="isOpen = true"
      >
        <IconDelete />
      </TheIconButton>
    </div>

    <ThePopup :is-open="isOpen" @ok="popupDelete" @close="isOpen = false"
    >Вы хотите удалить сотрудника?
    </ThePopup>
  </template>
</template>

<script>
import IconDelete from "./icons/IconDelete.vue";
import IconFullInfo from "./icons/IconFullInfo.vue";

import ThePopup from "./ThePopup.vue";
import TheIconButton from "../components/TheIconButton.vue";
import { vMaska } from "maska";

export default {
  components: { IconDelete, IconFullInfo, ThePopup, TheIconButton },
  directives: { maska: vMaska },

  props: {
    employee: {
      id: String,
      name: String,
      hide: Boolean,
      thumbnail: Boolean,
      gender: String,
      first_name: String,
      last_name: String,
      middle_name: String,
      birthday: String,
      email: String,
      cn: String,
      telephone: String,
      mobile: String,
      title: String,
      department: String,
      company: String,
      city: String,
      src: String
    }
  },

  data() {
    return {
      isOpen: false
    };
  },

  methods: {
    popupDelete() {
      this.$emit("deleteEmployee", { id: this.employee.id });
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>
.employee {
  display: grid;
  grid-template-columns: auto minmax(auto, 30%) 1fr 50px 105px repeat(2, auto);
  gap: 3%;

  align-items: center;
  border-radius: 8px;
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  background-color: var(--vt-c-white-mute);
  padding: 10px;
  margin-bottom: 10px;
}

.input-mask {
  background: inherit;
  box-shadow: none;
  font-style: normal;
  outline: none;
  padding: 0;
  margin: 0;
}

.employee__photo {
  width: 35px;
  height: 35px;
  border: 2px solid var(--vt-c-active-2);
  border-radius: 14%;
  box-shadow: 2px 2px 4px 1px var(--vt-c-active-6);
  margin: 0;
}

.employee__cn,
.employee__item-email {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media screen and (max-width: 767px) {
  .employee {
    grid-template-columns: minmax(30%, auto) 10% 22% 8% 8%;
  }

  .employee__item-email,
  .employee__photo {
    display: none;
  }
}

@media screen and (max-width: 540px) {
  .employee {
    grid-template-columns: 1fr repeat(2, auto);
  }

  .employee__item-telephone,
  .employee__item-mobile {
    display: none;
  }
}
</style>
