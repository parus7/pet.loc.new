<template>
  <template
    class="employee"
    :class="{ secondary: !isMain }"
  >

    <span
      class="employee__color-check"
      :class="{ hidden: !isMain }"
      ref="colorCheck"
      @click="setTag($event)"
    >
    </span>

    <!-- class "status " for the field  "hide" in employee (employeeData.json)-->
    <img
      class="employee__photo"
      :class="{ status: employee['hide'] }"
      :alt="`id: ${employee['id']}`"
      :src="employee['src']"
      width="35"
      height="35"
    />
    <span
      class="employee__cn ">{{ employee["cn"] }}
    </span>

    <span
      class="employee__item-email">{{ employee["email"] }}
    </span>

    <input
      class="employee__item-telephone input-mask"
      type="text"
      aria-label="phone"
      v-model="employee['telephone']"
      v-maska
      data-maska="##-##"
      tabindex="-1"
      readonly
    />

    <input
      class="employee__item-mobile input-mask"
      type="text"
      aria-label="mobile"
      v-model="employee['mobile']"
      v-maska
      data-maska="### ###-##-##"
      tabindex="-1"
      readonly
    />

    <RouterLink
      :to="{
        name: isMain  ? 'basicCard' : 'archiveCard',
        params: { id: employee['id'] }
      }"
      tabindex="-1"
    >
      <span class="tooltip tooltip-position" data-name="в&nbsp;профиль">
        <PageButton aria-label="переход в профиль сотрудника">
          <IconFullInfo />
        </PageButton>
      </span>
    </RouterLink>

    <span
      class="tooltip tooltip-position"
      :class="{ hidden: !isMain }"
      data-name="удалить&nbsp;в&nbsp;архив"
    >
        <PageButton
          aria-label="удалить сотрудника в архив"
          @click="isOpen = true"
        >
          <IconDelete />
        </PageButton>
      </span>

    <PagePopup
      :is-open="isOpen"
      @close="isOpen = false"
      @ok="popupDelete"
    >
      <template #popupText>
        Вы хотите удалить сотрудника?
      </template>

    </PagePopup>
  </template>

</template>

<script>
import IconDelete from "./icons/IconDelete.vue";
import IconFullInfo from "./icons/IconFullInfo.vue";

import PagePopup from "./PagePopup.vue";
import PageButton from "./UI/PageButton.vue";
import { vMaska } from "maska";

export default {
  components: { IconDelete, IconFullInfo, PagePopup, PageButton },
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
    },
    isMain: Boolean,
    isChecked: Boolean
  },

  data() {
    return {
      isOpen: false,
      clicks: 0
    };
  },

  watch: {
    isChecked(value) {
      if (value) {
        this.$refs.colorCheck.style.background = "var( --vt-c-white)";
      }
    }
  },

  methods: {
    popupDelete() {
      this.$emit("deleteEmployee", { id: this.employee.id });
      this.isOpen = false;
    },

    setTag(event) {
      this.clicks += event.detail;
      if (this.clicks === 1) {
        this.$refs.colorCheck.style.background = "var( --vt-c-outline-2)";
      } else if (this.clicks === 2) {
        this.$refs.colorCheck.style.background = "var(  --vt-c-alert-2)";
      } else if (this.clicks === 3) {
        this.$refs.colorCheck.style.background = "var( --vt-c-active-2)";
      } else {
        this.clicks = 0;
        this.$refs.colorCheck.style.background = "var( --vt-c-white)";
      }
    }
  }
};
</script>

<style scoped>
.employee {
  display: grid;
  grid-template-columns: min-content auto minmax(auto, 30%) 1fr 50px 105px repeat(2, auto);
  gap: 3%;

  align-items: center;
  border-radius: 8px;
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  background-color: var(--vt-c-white-mute);
  padding: 10px;
}

.input-mask {
  background: none;
  box-shadow: none;
  font-style: normal;
  outline: none;
  padding: 0;
}

.secondary {
  background-color: var(--vt-c-active-2);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-4);
}

.employee__photo {
  width: 35px;
  height: 35px;
  border: 2px solid var(--vt-c-active-2);
  border-radius: 14%;
  box-shadow: 2px 2px 4px 1px var(--vt-c-active-10);
}

.employee__color-check {
  border-radius: 24%;
  border: 2px solid var(--vt-c-active-4);
  background: var(--vt-c-white);
  box-shadow: none;
  padding: 7px;
  margin: 0;
}

.employee__cn,
.employee__item-email {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.tooltip-position:hover::after {
  right: 0;
}

@media screen and (max-width: 767px) {
  .employee {
    grid-template-columns: min-content minmax(30%, auto) 10% 22% 8% 8%;
  }

  .employee__item-email,
  .employee__photo {
    display: none;
  }

  .employee__color-check {
    padding: 10px;
  }
}

@media screen and (max-width: 540px) {
  .employee {
    grid-template-columns: min-content 1fr repeat(2, auto);
  }

  .employee__item-telephone,
  .employee__item-mobile {
    display: none;
  }
}
</style>
