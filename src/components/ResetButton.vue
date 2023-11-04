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

    cursor: pointer;
    font-family: Verdana, sans-serif;

    transition:
      background 0.1s ease-in-out,
      box-shadow 0.1s ease-in-out;

    &:hover {
      background: #ffe9db;
      box-shadow: 0 0 6px 0 #ffe9db;
    }
    &:active {
      background-color: #fff2d8;
    }
  }
</style>