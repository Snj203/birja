<template>
  <main class="auth-view">
    <div class="auth-container">
      <h1>Вход в систему</h1>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Введите ваш username"
            required
          >
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Введите ваш пароль"
            required
          >
        </div>

        <button type="submit" class="auth-button">Войти</button>
        <div v-if="message" class="error-message">{{ message }}</div>
      </form>


      <div class="auth-footer">
        <button @click="loginWithGoogle">Login with Google</button>
        <p>Нет аккаунта?
          <router-link to="/register" v-if="!isAuthenticated">Зарегистрируйтесь</router-link>
        </p>
        <router-link to="/forgot-password">Забыли пароль?</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import store from '@/storage/storage.js';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const message = ref('');
    const isAuthenticated = ref(false);

    onMounted(() => {
      const user = localStorage.getItem('user');
      if (user) {
        isAuthenticated.value = true;
      }
    });

    function loginWithGoogle() {
      window.location.href = 'http://localhost:8081/oauth2/authorization/google';
    }

    const handleLogin = async () => {
      const credentials = {
        username: username.value,
        password: password.value
      };

      try {
        const response = await store.dispatch('auth/login', credentials);
        if (response && response.status === 200) {
          await router.push('/');
        }
      } catch (error) {
        console.error("Login error:", error);
        message.value = error.response?.message || error.message || "Ошибка входа";
      }
    };


    return {
      username,
      password,
      message,
      isAuthenticated,
      handleLogin,
      loginWithGoogle
    };
  }
};
</script>

<style scoped>
.auth-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  padding: 2rem;
}

.auth-container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.auth-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.auth-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-button:hover {
  background-color: #3aa876;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
}

.auth-footer a {
  color: #42b983;
  text-decoration: none;
}

.error-message {
  color: #e74c3c;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
</style>
