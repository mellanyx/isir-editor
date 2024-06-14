<script setup lang="ts">

import AppHeader from "~/components/App/Header.vue";
import AppFooter from "~/components/App/Footer.vue";
</script>

<template>
  <div class="px-20">
    <AppHeader/>
      <div class="">
        <slot />
      </div>
    <AppFooter />
  </div>
</template>

<style scoped>

</style>