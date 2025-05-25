import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api', // Адрес бэкенда
});

api.interceptors.request.use(config => {
  const user = localStorage.getItem('user');
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;},
  error => {
    return Promise.reject(error);
  });

export default {
  getAllAds() {
    return api.get('/ads');
  },

  getAdsById(id) {
    return api.get(`/ads/${id}`);
  },

  createAd(adData) {
    return api.post('/ads', adData);
  },

  deleteAd(id) {
    return api.delete(`/ads/${id}`);
  },

  getSubjects() {
    return api.get('/subjects');
  }
};
