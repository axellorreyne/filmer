import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "/api/";

class GroupService
{
  async inGroup()
  {
    return((await axios.get(API_URL + 'in_group',  {headers: authHeader()})).data);
  }

  async createGroup(id)
  {
    return((await axios.get(API_URL + 'new_group/' + id,  {headers: authHeader()})).data);
  }

  async joinGroup(id)
  {
    return((await axios.post(API_URL + 'join_group/' + id, {}, {headers: authHeader()})).data);
  }
  
  async getGroup(id)
  {
    return((await axios.get(API_URL + 'get_group/' + id, {headers: authHeader()})).data);
  }
  
  async leaveGroup(id)
  {
    return((await axios.delete(API_URL + 'group_leave/' + id, {headers: authHeader()})).data);
  }

  async closeGroup(id)
  {
    return((await axios.delete(API_URL + 'group_close/' + id, {headers: authHeader()})).data);
  }

}
export default new GroupService();
