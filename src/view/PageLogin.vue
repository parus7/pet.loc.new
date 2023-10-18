<template>
  <PageEntrance
    :title="title"
    :isRecovery="isRecovery"
    :buttonTitle="buttonTitle"
    :errorMessage="errorMessage"
  >

    <template v-slot:linkRecovery>
      <RouterLink
        class="login-field__prompt"
        :to="{name: 'recovery' }"
      >
        Забыли пароль?
      </RouterLink>

    </template>

    <template v-slot:toPageBasic>
      <RouterLink
        class="login-field__prompt"
        :to="{name: 'basic'}"
      >
        Назад, на главную
      </RouterLink>

    </template>

  </PageEntrance>
</template>

<script>
import PageEntrance from "@/components/PageEntrance.vue";
import PageColorButton from "@/components/UI/PageColorButton.vue";


export default {
  components: { PageColorButton, PageEntrance },
  name: "PageLogin",

  data() {
    return {
      title: "Вход",
      isRegistration: false,
      isRecovery: false,
      buttonTitle: "Войти",
      errorMessage: ""
    };
  },

  methods: {}
};
</script>

<style scoped>
.login-field__prompt {
  color: var(--vt-c-grey-font);
  font-size: 1rem;
  text-decoration: none;
  border-bottom: 1px dashed var(--vt-c-active-10);
}

.login-field__prompt:hover {
  color: var(--vt-c-active-4);
  font-size: 0.97rem;
}
</style>

