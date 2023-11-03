<script setup>

</script>

<template>
  <button class="news__reset"><slot /></button>
</template>

<style scoped lang="scss">
  .news__reset {
    position: fixed;
    z-index: 2;
    top: 12px;
    right: 2%;

    outline: none;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background: #ffffff;
  }
</style>