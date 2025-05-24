<template>
  <form @submit.prevent="submitForm" class="ad-form">
    <h2>Создать новое объявление</h2>

    <div class="form-group">
      <label>Тип объявления*</label>
      <div class="radio-group">
        <label>
          <input
            type="radio"
            v-model="form.type"
            value="tutor"
            required
          >
          Я репетитор (ищу учеников)
        </label>
        <label>
          <input
            type="radio"
            v-model="form.type"
            value="student"
            required
          >
          Я студент (ищу репетитора)
        </label>
      </div>
    </div>

    <div class="form-group">
      <label>Предмет*</label>
      <select v-model="form.lessonName" required>
        <option value="">Выберите предмет</option>
        <option v-for="subject in subjects" :value="subject">{{ subject }}</option>
      </select>
    </div>

    <div class="form-group">
      <label>Заголовок*</label>
      <input
        type="text"
        v-model="form.title"
        placeholder="Например: Репетитор по математике"
        required
      >
    </div>

    <div class="form-group">
      <label>Описание*</label>
      <textarea
        v-model="form.description"
        rows="5"
        required
        placeholder="Опишите ваше предложение подробнее..."
      ></textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Цена (Сом/час)*</label>
        <input
          type="number"
          v-model.number="form.price"
          min="0"
          required
        >
      </div>

<!--      <div class="form-group">-->
<!--        <label>Место проведения</label>-->
<!--        <input-->
<!--          type="text"-->
<!--          v-model="form.location"-->
<!--          placeholder="Например: Онлайн или Москва, м. Китай-город"-->
<!--        >-->
<!--      </div>-->
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-btn">Опубликовать</button>
      <button type="button" @click="cancel" class="cancel-btn">Отмена</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['submit']);

// Список предметов (лучше вынести в отдельный файл или получать с API)
const subjects = [
  'Математика',
  'Физика',
  'Химия',
  'Английский язык',
  'Русский язык',
  'История',
  'Программирование'
];

const form = ref({
  type: '',
  subject: '',
  title: '',
  description: '',
  price: null,
  // location: 'Онлайн'
});

const submitForm = () => {
  emit('submit', {
    ...form.value,
    author: 'Текущий пользователь', // В реальном приложении брать из авторизации
    date: new Date().toISOString().split('T')[0],
    contacts: 'user@example.com' // Заменить на реальные контакты
  });

  // После отправки можно перенаправить на доску объявлений
  router.push('/board');
};

const cancel = () => {
  router.push('/board');
};
</script>

<style scoped>
.ad-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.ad-form h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #34495e;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-group textarea {
  resize: vertical;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  cursor: pointer;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}

.submit-btn {
  padding: 10px 20px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.cancel-btn {
  padding: 10px 20px;
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
