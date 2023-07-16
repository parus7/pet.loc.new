<template>
  <PageEntrance
    :title="title"
    :isRecovery="isRecovery"
    :buttonTitle="buttonTitle"
    :errorMessage="errorMessage"
    :recoveryLogin="recoveryLogin"
    @getRecovery="requestRecovery"
  >

  </PageEntrance>
</template>

<script>
import PageEntrance from "@/components/PageEntrance.vue";
import PageColorButton from "@/components/UI/PageColorButton.vue";
import axios from "axios";

export default {
  components: { PageColorButton, PageEntrance },
  name: "passwordRecovery",

  data() {
    return {
      title: "Восстановить пароль",
      isRecovery: true,
      buttonTitle: "Отправить код",
      errorMessage: "",
      recoveryLogin: ""
    };
  },

  methods: {
    requestRecovery(event) {
      axios.post("http://saa.44321.ru/", {
        login: event.login
      })
        // отправить код на эл почту и перекинуть на страницу входа + заполнить поле "Логин / E-mail"
        .then(function(response) {
          this.$router.push({ name: "login" });
          this.recoveryLogin = event.login;
        })
        .catch(error => (this.errorMessage = "Неверный логин / E-mail"));
    }
  }
};
</script>

<style scoped>

</style>