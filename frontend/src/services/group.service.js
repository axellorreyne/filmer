import axios from 'axios';

const API_URL = "/api/";

class GroupService
{

  async createGroup()
  {
    return((await axios.get(API_URL + 'creategroup')).data);
  }

  async joinGroup()
  {
  }

}
export default new GroupService();
