<template>
  <div class="home">
    <h1>Главная страница</h1>
    <p>Добро пожаловать на наш сайт!</p>
    <router-link to="/board">Доска объявлений</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home-Page'
}
</script>

<style scoped>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
