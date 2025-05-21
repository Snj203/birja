<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link
        to="/"
        class="nav-link"
        active-class="active"
        exact
      >
        Главная
      </router-link>
<!--      <router-link-->
<!--        to="/tab1"-->
<!--        class="nav-link"-->
<!--        active-class="active"-->
<!--      >-->
<!--        Кнопка 1-->
<!--      </router-link>-->
<!--      <router-link-->
<!--        to="/tab2"-->
<!--        class="nav-link"-->
<!--        active-class="active"-->
<!--      >-->
<!--        Кнопка 2-->
<!--      </router-link>-->
    </div>
    <div class="nav-right">
      <router-link
        to="/login"
        class="nav-link"
        active-class="active"
      >
        Войти
      </router-link>
      <router-link
        to="/register"
        class="nav-link"
        active-class="active"
      >
        Зарегистрироваться
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.nav-left, .nav-right {
  display: flex;
  gap: 1rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #e0e0e0;
}

.nav-link.active {
  background-color: #42b983;
  color: white;
}
</style>
