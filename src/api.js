import axios from 'axios';
import router from '@/router'

const api = axios.create({
  baseURL: 'http://localhost:8081/api', // Адрес бэкенда
});

api.interceptors.request.use(config => {
  const user = localStorage.getItem('user');
  if (user && user.access_token) {
    config.headers.Authorization = `Bearer ${user.access_token}`;
  }
  return config;},
  error => {
    return Promise.reject(error);
  });

api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const user = localStorage.getItem('user');
      const response = await axios.post('http://localhost:8081/api/auth/refresh', null,
        {
          params:{
            refreshToken:  user.refresh_token
          }
        });

      localStorage.setItem('user', JSON.stringify(response.data));

      originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem('user');
      await router.push('/login');
      return Promise.reject(refreshError);
    }
  }

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
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.access_token;
    return api.post('/ads', adData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  deleteAd(id) {
    return api.delete(`/ads/${id}`);
  },

  getSubjects() {
    return api.get('/subjects');
  }
};
