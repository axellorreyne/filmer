import axios from 'axios';
import authHeader from './auth-header';
import MovieService from "./movie.service";

const API_URL = "/api/";

class UserService {

    async getUserFromBrowserStrorage() {
        // localStorage.removeItem('name');
    }

    async removeUserFromBrowserStrorage() {
        return JSON.parse(localStorage.getItem('user'));
    }

    async getUser() {
        return (
            await axios.get(API_URL + 'user', {headers: authHeader()}).then(
                response => {
                    return response.data[0]
                },
                error => {
                    return ({data: "failed"})
                }
            ));
    }

    async getAuthTest() {
        return (await axios.get(API_URL + 'auth_test', {headers: authHeader()}).catch(e => {
            return ({data: "failed"})
        })).data;
    }

    async createReaction(movie_id, like, seen = false) {
        await axios.post(API_URL + "reaction/", {movie_id, like, seen}, {headers: authHeader()})
    }

    async getReactions() {
        return (await axios.get(API_URL + "reaction/", {headers: authHeader()})).data;
    }

    async changeReaction(movie_id, like, seen) {
        await axios.patch(API_URL + "reaction/" + movie_id + "/", {movie_id, like, seen}, {headers: authHeader()})
    }

    async searchMovie(term) {
        return (await axios.post(API_URL + "searchmovie", term, {headers: authHeader()})).data
    }

    async likeCount(movie_id) {
        return (await axios.get(API_URL + "like_count/" + movie_id, {headers: authHeader()})).data
    }

    async dislikeCount(movie_id) {
        return (await axios.get(API_URL + "dislike_count/" + movie_id, {headers: authHeader()})).data
    }

    async updateUser(username, email, password) {
        const params = {}
        if (username) {
            params.username = username;
        }

        if (email) {
            params.email = email;
        }
        if (password) {
            params.password = password;
        }
        console.log(params)
        return (await axios.patch(API_URL + 'user/', params, {headers: authHeader()}).data);
    }
}

export default new UserService();
