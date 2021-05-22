<template>
  <div class="paint" @click="close"> 
    <div class="paint__thinner">
      <img class="paint__image" :src="`/${filename}`">
      <div class="paint__label">{{label}} ({{size}})</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useStore } from 'vuex';

  export default defineComponent({
    props: {
      filename: String,
      label: String,
      size: String,
    },
    setup(props) {
      const store = useStore();
      const close = () => store.commit('setProgram', { name: '' });

      return { close, ...props };
    }
  });
</script>

<style scoped lang="scss">
  .paint {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(#222, .4);
    display: flex;
    justify-content: center;
  }

  .paint__thinner {
    background: #222;
    max-width: 450px;
    border-radius: 6px;
    margin: 15px;
    position: relative;
    top: 100px;
    height: min-content;

    @media (min-width: 500px) {
      top: 150px;
    }
  }

  .paint__image {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    max-width: 100%;
  }

  .paint__label {
    font-family: 'Roboto Mono', monospace, sans-serif;
    padding: 4px 10px;
    line-height: 1.3;
    font-size: 15px;
    color: #ff5;
  }
</style>