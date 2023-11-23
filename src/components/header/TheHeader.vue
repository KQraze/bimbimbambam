<script setup>

</script>

<template>
  <header class="header">

    <div class=" container">
      <router-link to="/" class="header__logo">
          <img src="/public/icon.svg" alt="Иконка типа" class="header__icon">
          <span class="header__name">Hacker News</span>
      </router-link>
    </div>

    <slot />

  </header>
</template>

<style scoped>
  @import "TheHeader.scss";
</style>