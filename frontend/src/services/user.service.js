import axios from 'axios';
import authHeader from './auth-header';
const API_URL = "/api/";
class UserService {
  async getAuthTest() {
      return (await axios.get(API_URL + 'auth_test', {headers: authHeader()}).catch(e => {return ({data: "failed"})})).data;
  }
}
export default new UserService();