<template>
  <div id="app">
    <div class="AppHeader"><AppHeader /></div>
    <div class="container-view"><router-view /></div>
  </div>
</template>

<script>
import AppHeader from "@/system/AppHeader.vue";

export default {
  name: 'App',
  components: {
    AppHeader,
  }
}
</script>

<style>
/* Global styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}

.container-view {
  min-width: 90vw;
  min-height: 80vh;
  padding: 1rem;
  background-color: #fff;
  overflow: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
