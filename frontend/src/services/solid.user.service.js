import axios from 'axios';
import authHeader from './auth-header';
import MovieService from "./movie.service";
import {getSolidDataset, getStringByLocaleAll, getStringNoLocale, getThingAll, getUrlAll} from "@inrupt/solid-client";
import {LDP, RDF} from "@inrupt/vocab-common-rdf";

const API_URL = "/api/";

function cleanWebId(id, loc){
    id = id.split('/')
    return id[0] + '//' + id[2] + '/' + id[3] + '/' + loc
}

class SolidUserService {
    async getReactions(session) {
        const moviesDataset = await getSolidDataset(cleanWebId(session.info.webId, 'movies/'), { fetch: session.fetch });
        let movies = getThingAll(moviesDataset);

        movies = movies.filter(movie => {
            return getUrlAll(movie, RDF.type).indexOf(LDP.Container) < 0 //Filter out the resources
        }).map(movie => movie.url)
        return movies
    }
}

export default new SolidUserService();