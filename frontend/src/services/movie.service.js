import axios from 'axios';

const API_URL = "/api/";

class MovieService 
{

    constructor() {
        this.preloaded = ""
    }
    async getMovieInfo(movie_id) 
    {
        return ( await axios.get(API_URL + `movie/${movie_id}`) ).data;
    }
    
    async getRandomMovie() 
    {
        if(this.preloaded==="") {
            return (await axios.get(API_URL + `random_movie`)).data;
        }
        else{
            const ret = this.getMovieInfo(this.preloaded)
            this.preloaded=""
            return ret
        }
    }
    
    async getRandomMovieInfo() 
    {
        const movie_id = (await this.getRandomMovie()).movie_id;
        return ( await axios.get(API_URL + `movie/${movie_id}` ) ).data;

    }

    loadNext(movie_id){
        this.preloaded=movie_id
    }
}

export default new MovieService();
