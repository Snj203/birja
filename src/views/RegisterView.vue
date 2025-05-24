<template>
  <main class="auth-view">
    <div class="auth-container">
      <h1>Регистрация</h1>

      <div v-if="step === 1" class="user-type-selection">
        <h3>Выберите тип аккаунта:</h3>
        <div class="user-types">
          <div
            v-for="type in userTypes"
            :key="type.value"
            class="user-type-card"
            :class="{ selected: selectedUserType === type.value }"
            @click="selectUserType(type.value)"
          >
            <h4>{{ type.label }}</h4>
            <p>{{ type.description }}</p>
          </div>
        </div>
        <button
          class="auth-button"
          @click="nextStep"
          :disabled="!selectedUserType"
        >
          Продолжить
        </button>
      </div>

      <form v-if="step === 2" @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            placeholder="Введите ваше имя пользователя"
            required
          >
        </div>

        <div class="form-group">
          <label for="name">Имя</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            placeholder="Введите ваше имя"
            required
          >
        </div>

        <div class="form-group">
          <label for="surname">Фамилия</label>
          <input
            type="text"
            id="surname"
            v-model="formData.surname"
            placeholder="Введите вашу Фамилия"
            required
          >
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="Введите ваш email"
            required
          >
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Введите пароль"
            required
          >
        </div>

        <div class="form-group">
          <label for="password-d">Повторите пароль</label>
          <input
            type="password"
            id="password-d"
            v-model="formData.confirmPassword"
            placeholder="Введите пароль"
            required
          >
        </div>

        <template v-if="selectedUserType === 'tutor'">
          <div class="form-group">
            <label for="name">Описание/Опыт</label>
            <textarea
              id="dec"
              v-model="formData.dec"
              placeholder="Введите описание вышего опыта работы/что вы преподаёте"
              required
              rows="12"
              cols="55"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="exp">Лет опыта</label>
            <input
              type="exp"
              id="exp"
              v-model="formData.exp"
              placeholder=""
            >
          </div>
        </template>

        <button type="submit" class="auth-button">Зарегистрироваться</button>
      </form>

      <div class="auth-footer">
        <p>Уже есть аккаунт? <router-link to="/login">Войдите</router-link></p>
        <button v-if="step === 2" class="back-button" @click="prevStep">Назад</button>
      </div>
    </div>
  </main>
</template>

<script>
import { compile } from 'vue'

export default {
  name: 'RegisterView',
  data() {
    return {
      step: 1,
      selectedUserType: null,
      userTypes: [
        {
          value: 'tutor',
          label: 'Учитель',
          description: ' Создавать обьявления '
        },
        {
          value: 'student',
          label: 'Студент',
          description: ' Искать обьявления '
        }
      ],
      formData: {
        username: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        exp: '',
        dec: '',
        confirmPassword: '',
        apiEndpoint: ''

      }
    }
  },
  methods: {
    selectUserType(type) {
      this.selectedUserType = type
    },
    nextStep() {
      if (this.selectedUserType) {
        this.step = 2
      }
    },
    prevStep() {
      this.step = 1
    },
    handleRegister() {

      this.formData.apiEndpoint = '/register' + "/" + this.selectedUserType;

      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Пароли не совпадают!')
        return
      }

    const registrationData = {
      endpoint: '/register/' + this.selectedUserType,
      userData: {
        username: this.formData.username,
        email: this.formData.email,
        password: this.formData.password,
        firstname: this.formData.name,
        lastname: this.formData.surname,
        dec: this.formData.description,
        exp: this.formData.experienceYears
        },
        mode: this.selectedUserType === 'tutor' ? 'tutor' : 'student'
      }



      this.$store.dispatch('auth/register', registrationData).then(
        () => {
          this.message = 'Registration successful!';
          setTimeout(() => this.$router.push('/login'), 2000);
        },
        error => {
          this.message = error.response.data.message || error.message;
        }
      );

    }
  }
}
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

.user-type-selection {
  text-align: center;
}

.user-types {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.user-type-card {
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 200px;
}

.user-type-card:hover {
  border-color: #42b983;
}

.user-type-card.selected {
  border-color: #42b983;
  background-color: rgba(66, 185, 131, 0.1);
}

.back-button {
  background: none;
  border: none;
  color: #42b983;
  cursor: pointer;
  margin-top: 1rem;
}

h1{
  margin-left: 80px;
}
.back-button:hover {
  text-decoration: underline;
}
</style>
