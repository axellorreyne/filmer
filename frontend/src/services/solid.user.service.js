import {
    addStringNoLocale, addUrl,
    createThing,
    deleteSolidDataset,
    getSolidDataset, getStringNoLocale,
    getStringNoLocaleAll,
    getThing,
    getThingAll, getUrl,
    getUrlAll, saveSolidDatasetAt, setThing
} from "@inrupt/solid-client";
import {LDP, RDF} from "@inrupt/vocab-common-rdf";

function cleanWebId(id, loc) {
    id = id.split('/')
    return id[0] + '//' + id[2] + '/' + id[3] + '/' + loc
}

class SolidUserService {

    isSolidUser(session) {
        return session.info.isLoggedIn

    }

    async getAllMovieURLs(session) {
        //TODO discover movie folder trough profile
        const moviesFolderDataset = await getSolidDataset(cleanWebId(session.info.webId, 'movies/'), {fetch: session.fetch});
        let moviesURls = getThingAll(moviesFolderDataset);

        return moviesURls.filter(movie => {
            return getUrlAll(movie, RDF.type).indexOf(LDP.Container) < 0 //Filter out the containers
        }).map(movie => movie.url)
    }

    getMovieIdFromThing(thing) {
        const sameAs = getStringNoLocaleAll(thing, "https://schema.org/sameAs");
        return sameAs.filter(a => a.includes("themoviedb"))[0].split('/')[4]
    }

    async getReactions(session) {
        let movies = []

        for (const movieURl of await this.getAllMovieURLs(session)) {

            let movieObj = {seen: false, like: true, url: movieURl}

            const movieDataset = await getSolidDataset(movieURl, {fetch: session.fetch})
            const all = getThingAll(movieDataset);

            all.forEach(thing => {
                const type = getUrl(thing, RDF.type)
                if (type === "https://schema.org/Movie") {
                    movieObj.movie_id = this.getMovieIdFromThing(thing);
                } else if (type === "https://schema.org/WatchAction") {
                    movieObj.seen = true;
                }
            })

            movies.push(movieObj)
        }
        return movies
    }

    async deleteMovie(session, url) {
        await deleteSolidDataset(url, {fetch: session.fetch});
    }

    async watchMovie(session, url, seen) {
        if (seen) {
            let movieDataset = await getSolidDataset(url, {fetch: session.fetch})
            const all = getThingAll(movieDataset);

            all.forEach(thing => {
                const type = getUrl(thing, RDF.type)
                if (type === "https://schema.org/Movie") {
                    let watchActionThing = createThing({name: "seen"});
                    watchActionThing = addUrl(watchActionThing, RDF.type, "https://schema.org/WatchAction");
                    watchActionThing = addUrl(watchActionThing, "https://schema.org/object", thing.url);
                    movieDataset = setThing(movieDataset, watchActionThing);
                    saveSolidDatasetAt(url, movieDataset, {fetch: session.fetch});
                }
            })

        }
    }
}

export default new SolidUserService();