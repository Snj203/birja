import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

class AuthService {
  login(user) {
    return axios
      .post('http://localhost:8081/login', null, {
        params: {
          username: user.username,
          password: user.password
        }
      })
      .then(response => {
        if (response.status === 200) {
          const userData = { username: user.username, ...response.data };
          localStorage.setItem('user', JSON.stringify(userData));
        }
        return response;
      })
      .catch(error => {
        throw error.response?.data || error;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(registrationData) {
    if (registrationData.mode === 'tutor') {
      return axios.post(API_URL + registrationData.endpoint, {
        username: registrationData.userData.username,
        email: registrationData.userData.email,
        password: registrationData.userData.password,
        firstname: registrationData.userData.firstname,
        lastname: registrationData.userData.lastname,
        description: registrationData.userData.dec,
        experienceYears: registrationData.userData.exp
      });
    } else {
      return axios.post(API_URL + registrationData.endpoint, {
        username: registrationData.userData.username,
        email: registrationData.userData.email,
        password: registrationData.userData.password,
        firstname: registrationData.userData.firstname,
        lastname: registrationData.userData.lastname
      });
    }
  }
}

export default new AuthService();
