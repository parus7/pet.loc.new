<template>
  <PageEntrance
    :title="title"
    :isRegistration="isRegistration"
    :isRecovery="isRecovery"
    :buttonTitle="buttonTitle"
  >

  </PageEntrance>
</template>

<script>
import PageEntrance from "@/components/PageEntrance.vue";
import PageColorButton from "@/components/UI/PageColorButton.vue";

export default {
  components: { PageColorButton, PageEntrance },
  name: "passwordRecovery",

  data() {
    return {
      title: "Восстановить пароль",
      isRegistration: false,
      isRecovery: true,
      buttonTitle: "Отправить"
    };
  }
};
</script>

<style scoped>

</style>