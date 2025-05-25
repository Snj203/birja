<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <h1>
          <router-link to="/" class="title-link">{{title}}</router-link>
        </h1>
        <span class="version">v{{ version }}</span>
      </div>
      <nav class="user-menu">
        <div v-if="!isAuthenticated" class="auth-buttons">
          <div class="nav-right">
            <router-link
              to="/login"
              class="nav-link login-btn"
              active-class="active"
            >
              Войти
            </router-link>
            <router-link
              to="/register"
              class="nav-link signup-btn"
              active-class="active"
            >
              Зарегистрироваться
            </router-link>
          </div>
        </div>
        <template v-else>
          <button class="notification-btn" @click="toggleNotifications">
            <span v-if="unreadNotifications" class="badge">{{ unreadNotifications }}</span>
            <i class="icon-bell"></i>
          </button>
          <dropdown-menu :user="currentUser" />
          <button class="auth-btn logout-btn" @click="handleLogout">Выйти</button>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import DropdownMenu from './DropdownMenu.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Биржа мемов'
  },
  version: {
    type: String,
    default: '1.0.0'
  }
});

const isAuthenticated = ref(false);

const currentUser = ref(null);

const unreadNotifications = ref(0);

// Функция для обработки выхода
const handleLogout = () => {
  console.log('Logout button clicked');
  isAuthenticated.value = false;
  currentUser.value = null;
  unreadNotifications.value = 0;
};

const toggleNotifications = () => {
  console.log('Show notifications');
};
</script>

<style scoped>
.nav-right {
  display: flex;
  gap: 1rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  background-color: white;
  color: brown;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #e0e0e0;
}

.login-btn.active {
  background-color: #2980b9;
}

.signup-btn.active {
  background-color: #27ae60;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.version {
  font-size: 0.8rem;
  opacity: 0.7;
}

.user-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.auth-buttons {
  display: flex;
  gap: 0.5rem;
}

.auth-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.login-btn {
  background-color: #3498db;
  color: white;
}

.login-btn.active {
  background-color: #2980b9;
}

.login-btn:hover {
  background-color: #2980b9;
}

.signup-btn {
  background-color: #2ecc71;
  color: white;
}

.signup-btn:hover {
  background-color: #27ae60;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-link {
  text-decoration: none;
  color: inherit;
}

.title-link:hover {
  text-decoration: underline;
}
</style>
