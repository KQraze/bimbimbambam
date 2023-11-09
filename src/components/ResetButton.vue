<script setup>

</script>

<template>
  <button class="news__reset"><slot /></button>
</template>

<style scoped lang="scss">
  .news__reset {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    display: inline-block;
    padding: 6px 6px;
    position: fixed;
    box-shadow: 0 0 4px 0 rgba(255, 165, 0, 0.37);

    top: 10.5px;
    right: 14px;
    z-index: 3;

    overflow: hidden;
    border: none;
    border-radius: 8px;
    color: #fe6637;
    transition: .2s ease-in-out;

    &:before {
      content: "";
      background: linear-gradient(90deg, rgba(255, 255, 255, .2), rgba(255, 255, 255, .6));
      height: 50px;
      width: 50px;
      position: absolute;
      top: -8px;
      left: -75px;
      transform: skewX(-45deg);
    }

    &:active {
      background: #7e4300;
      transition: .1s ease-in-out;
    }

    &:hover {
      background: #ff6937;
      color: #fff;
    }

    &:hover:before {
      left: 200px;
      transition: .7s ease-in-out;
    }
  }

  @include tablet {
    .news__reset {
      top: 8.5px;
      right: 14px;
    }
  }

  @include mobile {
    .news__reset {
      top: 9.7px;
      font-size: 11px;
      padding: 5.5px 5.5px;
      border-radius: 7px;

    }
  }
</style>