<template>
  <heading></heading>
  <emulator></emulator>
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
    min-height: inherit;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background:#1582e0;
    background: linear-gradient(180deg, #0371cf 3%, #1582e0 13%);
  }

  #app {
    padding: 20px 10px 0;
    min-height: inherit;
    grid-gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 500px) {
      padding-top: 40px;
      grid-gap: 25px;
    }
  }

  .heading,
  .emulator {
    max-width: 770px;
    width: 100%;
  }
</style>