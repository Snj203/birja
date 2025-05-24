import axios from 'axios';

// Создаём экземпляр axios с настройками
const api = axios.create({
  baseURL: 'http://localhost:8081/api', // Адрес бэкенда
});

// Добавляем автоматическую вставку токена (если есть)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Методы для работы с объявлениями
export default {
  // Получить все объявления
  getAllAds() {
    return api.get('/ads');
  },

  getAdsById(id) {
    return api.get(`/ads/${id}`);
  },

  // Создать объявление
  createAd(adData) {
    return api.post('/ads', adData);
  },

  // Удалить объявление
  deleteAd(id) {
    return api.delete(`/ads/${id}`);
  },

  getSubjects() {
    return api.get('/subjects');
  }
};
