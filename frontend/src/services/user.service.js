import axios from 'axios';
import authHeader from './auth-header';
import MovieService from "./movie.service";

const API_URL = "/api/";

class UserService {
  async getAuthTest() {
      return (await axios.get(API_URL + 'auth_test', {headers: authHeader()}).catch(e => {return ({data: "failed"})})).data;
  }

  async giveReaction(movie,like,seen=false){
      await axios.post(API_URL + "reaction/", {movie, like, seen})
      return MovieService.getRandomMovieInfo()
  }
}
export default new UserService();