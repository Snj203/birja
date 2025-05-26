<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <h1>
          <router-link to="/" class="title-link">{{ title }}</router-link>
        </h1>
      </div>
      <nav class="user-menu">
        <div class="nav-right">
          <template v-if="!isAuthenticated">
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
              v-if="!isAuthenticated"
            >
              Зарегистрироваться
            </router-link>
          </template>
          <template v-else>
            <button class="nav-link logout-btn" @click="handleLogout">Выйти</button>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/authService';

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    default: 'Биржа репетиторов'
  }
});

const isAuthenticated = ref(false);

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    isAuthenticated.value = true;
  }
});

const handleLogout = () => {
  AuthService.logout();
  isAuthenticated.value = false;
  router.push('/');
};
</script>

<style scoped>
.nav-right {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.nav-link.login-btn {
  background-color: #3498db;
  color: white;
}

.nav-link.login-btn:hover,
.nav-link.login-btn.active {
  background-color: #2980b9;
}

.nav-link.signup-btn {
  background-color: #2ecc71;
  color: white;
}

.nav-link.signup-btn:hover,
.nav-link.signup-btn.active {
  background-color: #27ae60;
}

.nav-link.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
}

.nav-link.logout-btn:hover {
  background-color: #c0392b;
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

.title-link {
  text-decoration: none;
  color: inherit;
}

.title-link:hover {
  text-decoration: underline;
}
</style>
