import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

class AuthService {
  login(user) {
    return axios
      .post('http://localhost:8081/login',null,{
         params : {
           username: user.username,
           password: user.password
         }
      })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(registrationData) {


    console.log(API_URL + registrationData.endpoint);

    if(registrationData.mode === 'tutor') {
      return axios.post(API_URL + registrationData.endpoint, {
        username: registrationData.userData.username,
        email: registrationData.userData.email,
        password: registrationData.userData.password,
        firstName: registrationData.userData.firstname,
        lastName: registrationData.userData.lastname,
        description: registrationData.userData.dec,
        experienceYears: registrationData.userData.exp
      });
    } else {
      return axios.post(API_URL + registrationData.endpoint, {
        username: registrationData.userData.username,
        email: registrationData.userData.email,
        password: registrationData.userData.password,
        firstName: registrationData.userData.firstname,
        lastName: registrationData.userData.lastname,
      });
    }
  }
}

export default new AuthService();
