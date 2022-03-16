import axios from 'axios';
import authHeader from './auth-header';
import MovieService from "./movie.service";

const API_URL = "/api/";

class UserService {
  async getAuthTest() {
      return (await axios.get(API_URL + 'auth_test', {headers: authHeader()}).catch(e => {return ({data: "failed"})})).data;
  }

  giveReaction(movie,like,seen=false){
       axios.post(API_URL + "reaction/", {movie, like, seen})
        axios.get(API_URL+"reaction/").then((data)=>console.log(data))
  }
}
export default new UserService();