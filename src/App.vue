<template>
  <div id="app">
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/add">Добавить репетитора</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
nav {
  margin-bottom: 20px;
}
</style>
