<template>
  <div class="footer">

    <RouterLink :to="{ name: 'login' }">
           <span class="tooltip tooltip-position" data-name="вход&nbsp;для&nbsp;HR">
              <PageButton aria-label="вход для HR">
        <IconHR />
              </PageButton>
           </span>
    </RouterLink>

    <span class="tooltip tooltip-position" data-name="настройки">
         <PageButton aria-label="настройки">
      <IconSettings />
         </PageButton>
      </span>

  </div>
</template>

<script>
import IconSettings from "@/components/icons/IconSettings.vue";
import IconHR from "@/components/icons/IconHR.vue";
import PageButton from "./UI/PageButton.vue";


export default {
  name: "PageFooter.vue",
  components: { IconSettings, IconHR, PageButton }
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: end;
  gap: 30px;
  background-color: var(--vt-c-white-mute);
  box-shadow: 0 0 2px 2px var(--vt-c-active-2);
  border-radius: 8px;
  padding: 35px 10px;
}

.tooltip-position:hover::after {
  right: 0;
}
</style>