<template>
  <!--  {{aEmployee}}-->
  <template class="employee">
    <img
      class="employee__photo"
      :alt="`id: ${aEmployee.id}`"
      :src="aEmployee.src"
      width="35"
      height="35"
    />

    <span
      class="employee__cn ">{{ aEmployee.cn }}
    </span>

    <span
      class="employee__item-email">{{ aEmployee.email }}
    </span>

    <input
      class="employee__item-telephone input-mask"
      type="text"
      aria-label="phone"
      v-model="aEmployee.telephone"
      v-maska
      data-maska="##-##"
      tabindex="-1"
      readonly
    />

    <input
      class="employee__item-mobile input-mask"
      type="text"
      aria-label="mobile"
      v-model="aEmployee.mobile"
      v-maska
      data-maska="### ###-##-##"
      tabindex="-1"
      readonly
    />

    <RouterLink
      :to="{
            name: 'archiveCard',
            params: { id: aEmployee.id },
          }"
      tabindex="-1"
    >
      <div class="help relative" data-name="в&nbsp;профиль">
        <TheIconButton aria-label="переход в профиль сотрудника в архиве">
          <IconFullInfo />
        </TheIconButton>
      </div>
    </RouterLink>

  </template>
</template>

<script>
import IconFullInfo from "./icons/IconFullInfo.vue";
import TheIconButton from "./UI/TheIconButton.vue";
import { vMaska } from "maska";

export default {
  components: { IconFullInfo, TheIconButton },
  directives: { maska: vMaska },

  props: {
    aEmployee: {
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
  box-shadow: 2px 2px 0 0 var(--vt-c-archive-5);
  background-color: var(--vt-c-archive-2);
  padding: 10px;
  margin-bottom: 10px;
}

.input-mask {
  background: none;
  box-shadow: none;
  font-style: normal;
  outline: none;
  padding: 0;
}

.employee__photo {
  width: 35px;
  height: 35px;
  border: 2px solid var(--vt-c-archive-2);
  border-radius: 14%;
  box-shadow: 2px 2px 4px 1px var(--vt-c-archive-5);
}

.employee__cn,
.employee__item-email {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media screen and (max-width: 767px) {
  .employee {
    grid-template-columns: minmax(30%, auto) 10% 22% 8%;
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
