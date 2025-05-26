<template>
  <div class="tutor-board">
    <h1 class="board-title">Доска объявлений</h1>

    <div class="controls">
      <div class="filters">
        <div class="filter-group" v-if="error">
          <p class="error-message">{{ error }}</p>
        </div>
        <div class="filter-group" v-else>
          <label>Тип объявления:</label>
          <select v-model="filters.type" :disabled="isLoading">
            <option value="all">Все</option>
            <option value="TUTOR">Ищу учеников</option>
            <option value="STUDENT">Ищу репетитора</option>
          </select>
        </div>

        <div class="filter-group" v-if="error">
          <p class="error-message">{{ error }}</p>
        </div>
        <div class="filter-group" v-else>
          <label>Предмет:</label>
          <select v-model="filters.lessonName" :disabled="isLoading">
            <option value="all">Все предметы</option>
            <option v-for="lesson in subjects" :key="lesson" :value="lesson">{{ lesson }}</option>
          </select>
        </div>

        <button @click="resetFilters" :disabled="isLoading" class="reset-btn">Сбросить</button>
      </div>

      <button @click="showForm = true" :disabled="isLoading" class="create-ad-btn">
        + Создать объявление
      </button>
    </div>

    <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
      <div class="modal-content">
        <form @submit.prevent="submitNewAd" class="ad-form">
          <h2>Создать новое объявление</h2>

          <div v-if="formError" class="error-message">{{ formError }}</div>

          <div class="form-group">
            <label>Тип объявления*</label>
            <div class="radio-group">
              <label>
                <input
                  type="radio"
                  v-model="newAd.type"
                  value="TUTOR"
                  required
                  :disabled="isLoading"
                >
                Я репетитор (ищу учеников)
              </label>
              <label>
                <input
                  type="radio"
                  v-model="newAd.type"
                  value="STUDENT"
                  required
                  :disabled="isLoading"
                >
                Я студент (ищу репетитора)
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Предмет*</label>
            <select v-model="newAd.lessonName" :disabled="isLoading">
              <option value="">Выберите предмет</option>
              <option v-for="lesson in subjects" :key="lesson" :value="lesson">{{ lesson }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Заголовок*</label>
            <input
              type="text"
              v-model="newAd.title"
              placeholder="Например: Репетитор по математике"
              required
              :disabled="isLoading"
            >
          </div>

          <div class="form-group">
            <label>Описание*</label>
            <textarea
              v-model="newAd.description"
              rows="5"
              required
              placeholder="Опишите ваше предложение подробнее..."
              :disabled="isLoading"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Цена (сом/час)*</label>
              <input
                type="number"
                v-model.number="newAd.price"
                min="0"
                required
                :disabled="isLoading"
              >
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" :disabled="isLoading" class="submit-btn">Опубликовать</button>
            <button type="button" @click="showForm = false" :disabled="isLoading" class="cancel-btn">Отмена</button>
          </div>
        </form>
      </div>
      <TransitionGroup name="notification-list">
        <component
          v-for="notification in notifications"
          :is="AppNotification"
          :key="notification.id"
          :message="notification.message"
          :type="notification.type"
          :duration="notification.duration"
          @close="removeNotification(notification.id)"
        />
      </TransitionGroup>
    </div>

    <!-- Список объявлений -->
    <div class="ads-container" v-if="!isLoading && !error">
      <div v-for="ad in filteredAds" :key="ad.id" class="ad-card">
        <div class="ad-header" :class="ad.type.toLowerCase()">
          <span class="ad-type">{{ ad.type === 'TUTOR' ? 'Ищу учеников' : 'Ищу репетитора' }}</span>
          <span class="ad-date">{{ formatDate(ad.createdAt) }}</span>
        </div>

        <div class="ad-body">
          <h3 class="ad-title">{{ ad.title }}</h3>
          <p class="ad-lessonName">Предмет: {{ ad.lessonName }}</p>
          <p class="ad-description">{{ ad.description }}</p>

          <div class="ad-details">
            <span>Цена: {{ ad.price }} сом/час</span>
          </div>
        </div>

        <div class="ad-footer">
          <button @click="contactAd(ad.id)" class="contact-btn">Связаться</button>
          <span class="ad-author">{{ ad.author || 'Неизвестный автор' }}</span>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Загрузка объявлений...</p>
    </div>

    <div v-if="filteredAds.length === 0 && !isLoading && !error" class="empty-state">
      <p>Нет объявлений по выбранным фильтрам</p>
      <button @click="resetFilters">Показать все</button>
    </div>
    <div v-if="error && !isLoading" class="error-state">
      <p class="error-message">{{ error }}</p>
      <button @click="retryLoad">Повторить попытку</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import api from '@/api';

const ads = ref([]);
const isLoading = ref(true);
const error = ref(null);
const formError = ref(null);
const showForm = ref(false);
const filters = ref({
  type: 'all',
  lessonName: 'all'
});
const subjects = ref([]);

const newAd = ref({
  type: '',
  lessonName: '',
  title: '',
  description: '',
  price: null,
});

const loadData = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const responseAds = await api.getAllAds();
    ads.value = responseAds.data.map(ad => ({
      ...ad,
      type: ad.type.toUpperCase(),
      author: ad.username,
      createdAt: ad.createdAt || new Date().toISOString()
    }));

    const responseSubjects = await api.getSubjects();
    subjects.value = responseSubjects.data.map(subject => subject.name);
  } catch (err) {
    error.value = 'Не удалось загрузить данные. Проверьте подключение или попробуйте позже.';
    console.error('Ошибка загрузки:', err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadData);

const retryLoad = () => {
  loadData();
};

const filteredAds = computed(() => {
  return ads.value.filter(ad => {
    const typeMatch = filters.value.type === 'all' || ad.type === filters.value.type;
    const lessonMatch = filters.value.lessonName === 'all' || ad.lessonName === filters.value.lessonName;
    return typeMatch && lessonMatch;
  });
});

const formatDate = (dateString) => {
  try {
    const options = { day: 'numeric', month: 'long' };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Дата неизвестна';
    }
    return date.toLocaleDateString('ru-RU', options);
  } catch (err) {
    console.error('Ошибка форматирования даты:', err);
    return 'Дата неизвестна';
  }
};

const resetFilters = () => {
  filters.value = {
    type: 'all',
    lessonName: 'all'
  };
};

const contactAd = (adId) => {
  const ad = ads.value.find(a => a.id === adId);
  if (ad.contacts) {
    alert(`Контакты автора: ${ad.contacts}`);
  } else {
    alert('Контакты не указаны');
  }
};

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Ошибка при парсинге JWT:', e);
    return null;
  }
};

const submitNewAd = async () => {
  try {
    formError.value = null;
    isLoading.value = true;
    if (!newAd.value.type || !newAd.value.lessonName || !newAd.value.title || !newAd.value.description || newAd.value.price === null) {
      throw new Error('Все поля обязательны для заполнения.');
    }
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.username) {
      throw new Error('Не удалось получить имя пользователя. Пожалуйста, войдите в систему.');
    }
    const payload = parseJwt(JSON.parse(localStorage.getItem('user')).access_token);
    const roles = payload?.roles || [];
    const type = roles.length > 0 ? roles[0].replace('ROLE_', '') : 'UNKNOWN';

    newAd.value.type = type.toUpperCase();
    newAd.value.username = user.username;

    const response = await api.createAd(newAd.value);


    ads.value.unshift({
      ...response.data,
      type: response.data.type.toUpperCase(),
      author: response.data.username
    });
    showForm.value = false;

    newAd.value = {
      type: '',
      lessonName: '',
      title: '',
      description: '',
      price: null,
    };
  } catch (err) {
    formError.value = err.message || 'Не удалось создать объявление. Проверьте данные и попробуйте снова.';
    console.error('Ошибка создания объявления:', err);
  } finally {
    isLoading.value = false;
  }
};
const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) notifications.value.splice(index, 1);
};
</script>

<style scoped>
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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

.ad-lessonName {
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

.loading-state {
  text-align: center;
  padding: 50px 0;
  color: #7f8c8d;
}

.error-state {
  text-align: center;
  padding: 50px 0;
  color: #e74c3c;
}

.error-state button {
  margin-top: 15px;
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  color: #e74c3c;
  margin-bottom: 10px;
  font-weight: 500;
}

:deep(.filter-group select:disabled),
:deep(.reset-btn:disabled),
:deep(.create-ad-btn:disabled),
:deep(.submit-btn:disabled),
:deep(.cancel-btn:disabled),
:deep(.radio-group input:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
