import {
    addDatetime,
    addStringNoLocale, addUrl, buildThing, createSolidDataset,
    createThing,
    deleteSolidDataset,
    getSolidDataset, getStringNoLocale,
    getStringNoLocaleAll,
    getThing,
    getThingAll, getUrl,
    getUrlAll, removeThing, saveSolidDatasetAt, setThing
} from "@inrupt/solid-client";
import {LDP, RDF} from "@inrupt/vocab-common-rdf";
import moment from "moment/moment";

function cleanWebId(id, loc) {
    id = id.split('/')
    return id[0] + '//' + id[2] + '/' + id[3] + '/' + loc
}

class SolidUserService {

    isSolidUser(session) {
        return session.info.isLoggedIn

    }

    async getUserInfo(session){
        const dataSet = await getSolidDataset(cleanWebId(session.info.webId,'profile/card'),{fetch:session.fetch});
        let ob = {oidcIssuer:"",name:""}
        for (const thing of getThingAll(dataSet)){
            const type = getUrl(thing,RDF.type)
            if(type==="http://xmlns.com/foaf/0.1/Person")
                ob.oidcIssuer = getUrl(thing,"http://www.w3.org/ns/solid/terms#oidcIssuer")
            else if(type==='http://xmlns.com/foaf/0.1/PersonalProfileDocument')
                ob.name = getUrl(thing,"http://xmlns.com/foaf/0.1/maker").split("/")[3]
        }
        return ob
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
                console.log(type)
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
        let movieDataset = await getSolidDataset(url, {fetch: session.fetch})
        const all = getThingAll(movieDataset);

        if (seen) {
            for (const thing of all) {
                const type = getUrl(thing, RDF.type)
                if (type === "https://schema.org/Movie") {
                    let watchActionThing = createThing({name: "seen"});
                    watchActionThing = addUrl(watchActionThing, RDF.type, "https://schema.org/WatchAction");
                    watchActionThing = addUrl(watchActionThing, "https://schema.org/object", thing.url);
                    watchActionThing = addDatetime(watchActionThing, "http://purl.org/dc/terms/created", new Date())
                    watchActionThing = addDatetime(watchActionThing, "https://schema.org/startTime", new Date())
                    watchActionThing = addDatetime(watchActionThing, "https://schema.org/endTime", new Date())
                    movieDataset = setThing(movieDataset, watchActionThing);
                    await saveSolidDatasetAt(url, movieDataset, {fetch: session.fetch});
                    break;
                }
            }

        } else {
            for (const thing of all) {
                const type = getUrl(thing, RDF.type)
                if (type === "https://schema.org/WatchAction") {
                    movieDataset = removeThing(movieDataset, thing);
                    await saveSolidDatasetAt(url, movieDataset, {fetch: session.fetch});
                    break;
                }
            }
        }
    }

    async likeMovie(session, movie, seen) {
        let newMovieDataSet = createSolidDataset();

        const newMovieThing = buildThing(createThing({name: "it"}))
            .addUrl(RDF.type, 'https://schema.org/Movie')
            .addStringNoLocale('https://schema.org/name', movie.title)
            .addStringNoLocale("https://schema.org/sameAs", `https://www.imdb.com/title/${movie.imdb_id}`)
            .addStringNoLocale("https://schema.org/sameAs", `https://www.themoviedb.org/movie/${movie.id}`)
            .addDatetime("http://purl.org/dc/terms/created", new Date())
            .addDatetime("http://purl.org/dc/terms/modfied", new Date())
            .addStringNoLocale('https://schema.org/description', movie.overview)
            .addDatetime("https://schema.org/datePublished", moment(movie.release_date, 'YYYY-MM-DD').toDate())
            .addStringNoLocale('https://schema.org/image', `https://image.tmdb.org/t/p/original/${movie.poster_path}`)
            .build();

        newMovieDataSet = setThing(newMovieDataSet, newMovieThing);
        const url = cleanWebId(session.info.webId, `movies/${movie.title.toLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9-_]/g, '')}-`
            + `${movie.release_date.toLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9-_]/g, '')}`)
        console.log(url)

        await saveSolidDatasetAt(url, newMovieDataSet, {fetch: session.fetch});

        if (seen) {
            await this.watchMovie(session, url, true);
        }
    }
}

export default new SolidUserService();