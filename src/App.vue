<template>
  <heading></heading>
  <main class="main">
    <emulator></emulator>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Heading from '@/components/Heading.vue';
  import Emulator from '@/components/Emulator.vue';

  export default defineComponent({
    components: {
      Heading,
      Emulator,
    }
  });
</script>

<style lang="scss">
  html {
    box-sizing: border-box;
    min-height: 100vh;
  }
  
  *,
  *:before,
  *:after {
    font-family: inherit;
    box-sizing: inherit;
  }

  body {
    margin: 0;
    min-height: inherit;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background:#1582e0;
    background: linear-gradient(180deg, #0371cf 3%, #1582e0 13%);
    padding-top: 20px;
    min-height: inherit;

    @media (min-width: 500px) {
      padding-top: 40px;
    }
  }

  $width: 800px;

  .heading {
    max-width: $width;
    margin: 0 auto;
    padding: 0 15px;
  }

  .main {
    max-width: $width;
    margin: 20px auto;
    padding: 0 10px;

    @media (min-width: 500px) {
      margin: 25px auto;
    }
  }
</style>