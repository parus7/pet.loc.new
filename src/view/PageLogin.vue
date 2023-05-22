<template>
  <PageEntrance
    :title="title"
    :isRecovery="isRecovery"
    :buttonTitle="buttonTitle"
  >

    <RouterLink
      class="login-field__prompt"
      :to="{
        name: 'recovery',
      }"
    >Забыли пароль?
    </RouterLink>

    <RouterLink
      class="login-field__prompt"
      :to="{
        name: 'registration',
      }"
    >Создать аккаунт
    </RouterLink>
  </PageEntrance>
</template>

<script>
import PageEntrance from "@/components/PageEntrance.vue";
import PageButton from "@/components/UI/PageButton.vue";

export default {
  components: { PageButton, PageEntrance },
  name: "PageLogin",

  data() {
    return {
      title: "Вход",
      isRegistration: false,
      isRecovery: false,
      buttonTitle: "Войти"
    };
  }
};
</script>

<style scoped>
.login-field__prompt {
  color: var(--vt-c-grey-font);
  font-size: 1rem;
  text-decoration: none;
  border-bottom: 1px dashed var(--vt-c-active-10);
  /*margin: 10px;*/
}
</style>