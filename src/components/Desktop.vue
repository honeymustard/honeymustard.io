<template>
  <div class="desktop">
    <div class="desktop__shortcut" @click="openEmulator()">
      <span class="desktop__icon"></span>
      <label class="desktop__label">Emulator</label>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useStore } from '@/store/store';

  export default defineComponent({
    setup() {
      const store = useStore();
      const openEmulator = () => store.commit('setEmulator', true);
      return { openEmulator };
    }
  })
</script>

<style lang="scss">
  .desktop {
    display: flex;
  }

  .desktop__shortcut {
    position: relative;
    font-family: 'Roboto Mono', monospace, sans-serif;
    font-size: 16px;
    color: #fff;
    cursor: pointer;

    &:hover .desktop__icon {
      transform: scale(1.05);
    }
  }

  .desktop__icon {
    display: block;
    width: 100%;
    background: #222;
    height: 50px;
    border-radius: 4px;
    position: relative;
    margin: 0 0 4px;
    box-shadow: 0px 2px 6px 0 rgba(#000, .4);
    transition: transform .2s ease;

    &:before {
      display: block;
      content: 'c:/';
      position: absolute;
      bottom: 6px;
      left: 8px;
      color: #ff5;
      font-size: 15px;
    }

    &:after {
      display: block;
      content: '';
      position: absolute;
      top: 7px;
      right: 5px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #ff5;
    }
  }

  .desktop__label {
    position: relative;
    z-index: 2;
    text-shadow: 1px 2px 2px rgba(#000, .2);
  }
</style>