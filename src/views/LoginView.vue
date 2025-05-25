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
      </form>

      <a href="http:/localhost:8081/oauth2/authorization/google" class="btn btn-google">
        <i class="fab fa-google"></i> Войти через Google
      </a>

      <div class="auth-footer">
        <p>Нет аккаунта? <router-link to="/register">Зарегистрируйтесь</router-link></p>
        <router-link to="/forgot-password">Забыли пароль?</router-link>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      const credentials = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch('auth/login', credentials).then(
        () => {
          this.$router.push('/');
        },
        error => {
          this.message = error.response.data.message || error.message;
        }
      ).catch(error => {
        console.error("Login error:", error);
        this.message = error

      });
    }
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
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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
</style>
