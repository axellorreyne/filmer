import axios from 'axios';

const API_URL = "/api/";

class MovieService 
{

    async getMovieInfo(movie_id) 
    {
        return((await axios.get(API_URL + `movie/${movie_id}`) ).data);
    }
    
    async getRandomMovie() 
    {
        return((await axios.get(API_URL + `random_movie`) ).data);
    }
    
    async getRandomMovieInfo() 
    {
        const movie_id = await (await axios.get(API_URL + `random_movie`)).data.movie_id;
        return((await axios.get(API_URL + `movie/${movie_id}`)).data);
    }

}

export default new MovieService();
