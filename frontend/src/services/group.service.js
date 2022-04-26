import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "/api/";

class GroupService
{

  async createGroup()
  {
    return((await axios.get(API_URL + 'new_group',  {headers: authHeader()})).data);
  }

  async joinGroup(id)
  {
    return((await axios.post(API_URL + 'join_group/' + id, {}, {headers: authHeader()})).data);
  }

}
export default new GroupService();
