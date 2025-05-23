<template>
  <div class="tutor-board">
    <!-- Заголовок и фильтры -->
    <h1 class="board-title">Доска объявлений</h1>

    <div class="controls">
      <div class="filters">
        <div class="filter-group">
          <label>Тип объявления:</label>
          <select v-model="filters.type">
            <option value="all">Все</option>
            <option value="tutor">Ищу учеников</option>
            <option value="student">Ищу репетитора</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Предмет:</label>
          <select v-model="filters.subject">
            <option value="all">Все предметы</option>
            <option v-for="subject in subjects" :value="subject">{{ subject }}</option>
          </select>
        </div>

        <button @click="resetFilters" class="reset-btn">Сбросить</button>
      </div>

      <button @click="showForm = true" class="create-ad-btn">
        + Создать объявление
      </button>
    </div>

    <!-- Форма создания (модальное окно) -->
    <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
      <div class="modal-content">
        <form @submit.prevent="submitNewAd" class="ad-form">
          <h2>Создать новое объявление</h2>

          <div class="form-group">
            <label>Тип объявления*</label>
            <div class="radio-group">
              <label>
                <input
                  type="radio"
                  v-model="newAd.type"
                  value="tutor"
                  required
                >
                Я репетитор (ищу учеников)
              </label>
              <label>
                <input
                  type="radio"
                  v-model="newAd.type"
                  value="student"
                  required
                >
                Я студент (ищу репетитора)
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Предмет*</label>
            <select v-model="newAd.subject" required>
              <option value="">Выберите предмет</option>
              <option v-for="subject in subjects" :value="subject">{{ subject }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Заголовок*</label>
            <input
              type="text"
              v-model="newAd.title"
              placeholder="Например: Репетитор по математике"
              required
            >
          </div>

          <div class="form-group">
            <label>Описание*</label>
            <textarea
              v-model="newAd.description"
              rows="5"
              required
              placeholder="Опишите ваше предложение подробнее..."
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Цена (₽/час)*</label>
              <input
                type="number"
                v-model.number="newAd.price"
                min="0"
                required
              >
            </div>

            <div class="form-group">
              <label>Место проведения</label>
              <input
                type="text"
                v-model="newAd.location"
                placeholder="Например: Онлайн или Москва, м. Китай-город"
              >
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn">Опубликовать</button>
            <button type="button" @click="showForm = false" class="cancel-btn">Отмена</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Список объявлений -->
    <div class="ads-container">
      <div v-for="ad in filteredAds" :key="ad.id" class="ad-card">
        <div class="ad-header" :class="ad.type">
          <span class="ad-type">{{ ad.type === 'tutor' ? 'Ищу учеников' : 'Ищу репетитора' }}</span>
          <span class="ad-date">{{ formatDate(ad.date) }}</span>
        </div>

        <div class="ad-body">
          <h3 class="ad-title">{{ ad.title }}</h3>
          <p class="ad-subject">Предмет: {{ ad.subject }}</p>
          <p class="ad-description">{{ ad.description }}</p>

          <div class="ad-details">
            <span>Цена: {{ ad.price }} ₽/час</span>
            <span>Место: {{ ad.location }}</span>
          </div>
        </div>

        <div class="ad-footer">
          <button @click="contactAd(ad.id)" class="contact-btn">Связаться</button>
          <span class="ad-author">{{ ad.author }}</span>
        </div>
      </div>
    </div>

    <!-- Пустое состояние -->
    <div v-if="filteredAds.length === 0" class="empty-state">
      <p>Нет объявлений по выбранным фильтрам</p>
      <button @click="resetFilters">Показать все</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import api from '@/api';

// Состояние компонента
const ads = ref([]);
const isLoading = ref(true);
const showForm = ref(false);
const filters = ref({
  type: 'all',
  subject: 'all'
});

// Форма нового объявления
const newAd = ref({
  type: '',
  subject: '',
  title: '',
  description: '',
  price: null,
  location: 'Онлайн'
});

// Список предметов
const subjects = ref([
  'Математика',
  'Физика',
  'Химия',
  'Английский язык',
  'Русский язык',
  'История',
  'Программирование'
]);

// Загрузка объявлений при монтировании
onMounted(async () => {
  try {
    const response = await api.getAllAds();
    ads.value = response.data;
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    alert('Не удалось загрузить объявления');
  } finally {
    isLoading.value = false;
  }
});

// Фильтрация объявлений
const filteredAds = computed(() => {
  return ads.value.filter(ad => {
    const typeMatch = filters.value.type === 'all' || ad.type === filters.value.type;
    const subjectMatch = filters.value.subject === 'all' || ad.subject === filters.value.subject;
    return typeMatch && subjectMatch;
  });
});

// Форматирование даты
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

// Сброс фильтров
const resetFilters = () => {
  filters.value = {
    type: 'all',
    subject: 'all'
  };
};

// Контакт с автором
const contactAd = (adId) => {
  const ad = ads.value.find(a => a.id === adId);
  alert(`Контакты автора: ${ad.contacts}`);
};

// Создание нового объявления
const submitNewAd = async () => {
  try {
    const response = await api.createAd(newAd.value);
    ads.value.unshift(response.data);
    showForm.value = false;

    // Сброс формы
    newAd.value = {
      type: '',
      subject: '',
      title: '',
      description: '',
      price: null,
      location: 'Онлайн'
    };
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Не удалось создать объявление');
  }
};
</script>

<style scoped>
/* Стили из предыдущего примера (TutorBoard) */
.tutor-board {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.board-title {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 20px;
}

.filters {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-weight: 500;
}

.filter-group select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.reset-btn {
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-ad-btn {
  padding: 10px 20px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

/* Стили формы */
.ad-form {
  padding: 20px;
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
  background: #3498db;
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

/* Остальные стили из предыдущего TutorBoard */
.ads-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.ad-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.ad-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.ad-header {
  padding: 12px 15px;
  display: flex;
  justify-content: space-between;
  color: white;
  font-weight: 500;
}

.ad-header.tutor {
  background: #3498db;
}

.ad-header.student {
  background: #2ecc71;
}

.ad-body {
  padding: 15px;
}

.ad-title {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.ad-subject {
  color: #7f8c8d;
  margin: 5px 0;
  font-size: 0.9em;
}

.ad-description {
  margin: 15px 0;
  line-height: 1.5;
}

.ad-details {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  color: #34495e;
  font-size: 0.9em;
}

.ad-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-top: 1px solid #eee;
}

.contact-btn {
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.ad-author {
  font-size: 0.9em;
  color: #7f8c8d;
}

.empty-state {
  text-align: center;
  padding: 50px 0;
  color: #7f8c8d;
}

.empty-state button {
  margin-top: 15px;
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .ads-container {
    grid-template-columns: 1fr;
  }

  .controls {
    flex-direction: column;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
