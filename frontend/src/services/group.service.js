import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "/api/";

class GroupService
{

  async createGroup()
  {
    return((await axios.post(API_URL + 'group', {headers: authHeader()})).data);
  }

  async joinGroup(id)
  {
    return((await axios.post(API_URL + 'groupadd', {id: id}, {headers: authHeader()})).data);
  }

}
export default new GroupService();
