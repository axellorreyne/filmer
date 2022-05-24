import React, {Component} from "react";
import stringSimilarity from "string-similarity";

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";
import FMovieLine from "../components/FMovieLine";
import RsrcIconArrowLeft from "../resources/icon_arrow_left.svg";
import RsrcIconArrowRight from "../resources/icon_arrow_right.svg";
import RsrcIconArrowLeftActive from "../resources/icon_arrow_left_active.svg";
import RsrcIconArrowRightActive from "../resources/icon_arrow_right_active.svg";
import {SessionContext} from "@inrupt/solid-ui-react";

import MovieService from "../services/movie.service";
import UserService from "../services/user.service";
import SolidUserService from "../services/solid.user.service"

import RsrcSearchIcon from "../resources/icon_search.svg";
import RsrcLikeIcon from "../resources/icon_heart.svg"
import RsrcDislikeIcon from "../resources/icon_vomit.svg"
import SolidMovieService from "../services/solid.movie.service";

class SearchMoviesPage extends Component {

    static contextType = SessionContext

    constructor(probs) {
        super(probs);
        this.setFilterSearch = this.setFilterSearch.bind(this);
        this.setSearchTerm = this.setSearchTerm.bind(this);
        this.sortOnSeen = this.sortOnSeen.bind(this);
        this.sortOnTitle = this.sortOnTitle.bind(this);
        this.sortOnScore = this.sortOnScore.bind(this);
        this.sortOnPopularity = this.sortOnPopularity.bind(this)
        this.newSortOption = this.newSortOption.bind(this);
        this.urls = new Map()
        this.allReactions = []
        this.currentSearchTerm = "";
        this.sortName = "Sort";
        //movies: list of movie objects (see reference)
        //sorter: een compare die 2 movie objecten neemt, en een gelijkenis tussen -1 en 1 teruggeeft
        //searchOption: naam van de gekozen zoek optie
        //score: neemt een movie en geeft een gelijkenis met de zoekterm terug. Wordt gebruikt door sorteren en filter
        this.state = {
            searchTerm: "",
            loading: 0,
            movies: [],
            likedMovies: new Map(),
            seen: new Map(),
            sorter: (i, o) => 0
        };
    }

    setSearchTerm(st) {
        this.setState({searchTerm: st.target.value})
    }

    sortOnSeen(i, o) {
        const iSeen = this.state.likedMovies.get(i.id.toString())
        const oSeen = this.state.likedMovies.get(o.id.toString())
        return (iSeen) ? (oSeen) ? 0 : 1 : (oSeen) ? -1 : 0
    }

    sortOnTitle(i, o) {
        return (i.original_title.toUpperCase() === o.original_title.toUpperCase()) ? 0 :
            (i.original_title.toUpperCase() > o.original_title.toUpperCase()) ? 1 : -1
    }

    sortOnPopularity(i, o) {
        return o.vote_average - i.vote_average
    }

    sortOnScore(i, o) {
        return stringSimilarity.compareTwoStrings(o.original_title, this.currentSearchTerm) + (this.currentSearchTerm.includes(i.id.toString()) ? 0.2 : 0)
            - (stringSimilarity.compareTwoStrings(i.original_title, this.currentSearchTerm) + (this.currentSearchTerm.includes(o.id.toString()) ? 0.2 : 0))
    }

    setFilterSearch() {
        this.setState(prev => ({loading: prev.loading + 1}))
        const finalTerm = this.state.searchTerm
        this.currentSearchTerm = finalTerm;
        if (finalTerm.length === 0) {
            this.setState({movies: [], seen: new Map(), loading: false})
        } else {
            UserService.searchMovie(finalTerm).then(movies => {
                    this.sortName = "Search"

                    movies.forEach(movie => {
                        if (!this.state.seen.has(movie.id.toString()))
                            this.state.seen.set(movie.id.toString(), false)
                    })
                    movies.forEach(movie => {
                        if (!this.state.likedMovies.has(movie.id.toString()))
                            this.state.likedMovies.set(movie.id.toString(), false)
                    })
                    this.setState(prev => ({
                        sorter: this.sortOnScore,
                        loading: prev.loading - 1,
                        movies
                    }))
                }
            )
        }
    }

    newSortOption(name, sorter) {
        const clickEvent = () => {
            this.sortName = name
            this.setState({sorter})
        }
        return this.newDropDown(clickEvent, name)
    }

    newDropDown(clickEvent, name) {
        return <li>
            <a className="dropdown-item hover-bg-dark btn rounded-0" onClick={clickEvent}>{name}</a>
        </li>
    }

    componentDidMount() {
        this.setState(prev => ({loading: prev.loading + 1}))
        document.title = "Filmer: Add Movies";
        let task = (SolidUserService.isSolidUser(this.context.session)) ? SolidMovieService.getReactions(this.context.session) : UserService.getReactions()
        task.then(reactions => {
            console.log("rammus quote")
            this.allReactions = reactions.map(reaction => reaction.movie_id)
            reactions.forEach(react => this.urls.set(react.movie_id, react.url))
            reactions.forEach(react => this.state.seen.set(react.movie_id, react.seen))
            reactions.forEach(reaction => this.state.likedMovies.set(reaction.movie_id, reaction.like))
            this.setState(prev => ({loading: prev.loading - 1}))
        })
    }

    render() {
        if (this.state.loading > 0) {
            return (
                <div className="container h-100 d-flex flex-column align-items-center">
                    <FHeader/>
                    <div className="mb-auto mt-auto text-center">
                        <span className="spinner-border spinner-border-sm me-3"/>
                    </div>
                    <FFooter/>
                </div>
            );
        }
        let rendered = this.state.movies.sort(this.state.sorter)
            .map(ele => {
                    let id = ele.id.toString()
                    let reacted = this.allReactions.includes(id)
                    return <FMovieLine hasReaction={reacted} movie={ele} seen={this.state.seen.get(id)}
                                       onSeen={() => {
                                           this.setState(prev => {
                                               prev.seen.set(id, !prev.seen.get(id))
                                               return prev
                                           })
                                           if (SolidUserService.isSolidUser(this.context.session)) {
                                               SolidMovieService.changeReaction(this.context.session, this.urls.get(id), !this.state.seen.get(id))
                                           } else {
                                               if (reacted) {
                                                   UserService.changeReaction(id, this.state.likedMovies.get(id), !this.state.seen.get(id))
                                               } else {
                                                   UserService.createReaction(id, this.state.likedMovies.get(id), !this.state.seen.get(id))
                                                   this.allReactions.push(id)
                                               }
                                           }
                                       }}
                                       onReact={() => {
                                           this.setState(prev => {
                                               prev.likedMovies.set(id, !prev.likedMovies.get(id))
                                               return prev
                                           })
                                           if (SolidUserService.isSolidUser(this.context.session)) {
                                               if (!this.state.likedMovies.get(id)) {
                                                   SolidMovieService.likeMovie(this.context.session, ele, this.state.seen.get(id)).then(url => this.urls.set(id, url))
                                               } else {
                                                   SolidMovieService.deleteMovie(this.context.session, this.urls.get(id))
                                               }
                                           } else {
                                               if (this.allReactions.includes(id)) {
                                                   UserService.changeReaction(id, !this.state.likedMovies.get(id), this.state.seen.get(id))
                                               } else {
                                                   UserService.createReaction(id, !this.state.likedMovies.get(id), this.state.seen.get(id))
                                                   this.allReactions.push(id)
                                               }
                                           }
                                       }} hideButtons={false}
                                       renderInfo={false}
                                       reactIcon={(this.state.likedMovies.get(id)) ? RsrcDislikeIcon : RsrcLikeIcon}/>
                }
            )
        if (rendered.length === 0) {
            let text = "No movies found with the current search term!"
            if (this.currentSearchTerm.length === 0)
                text = "Enter a search term to find movies!"
            rendered = <div className="container-fluid mt-5">
                <h5>No movies to show.</h5>
                <h5>{text}</h5>
            </div>
        }


        let proximity = this.newSortOption("Search", this.sortOnScore)


        const sortName = this.sortName;
        const popuSort = this.newSortOption("Popularity", this.sortOnPopularity)
        const titleSort = this.newSortOption("Title", this.sortOnTitle)
        const seenSort = this.newSortOption("Reaction", this.sortOnSeen)
        return (
            <div className="h-100 d-flex flex-column m-3 m-xl-0">
                <FHeader/>
                <main className="mb-5 container-fluid">
                    <div className="my-5 d-lg-flex justify-content-around align-items-center">
                        <div className="col-lg-7 mx-md-5 mb-5">
                            <p className="ffs-1 ffw-2 m-0 p-0 me-4">Search Movies</p>
                            <div className="d-md-flex mt-4 justify-content-start align-items-center">
                                <div className="col-md-2 dropdown h-50">
                                    <button type="button"
                                            className="FFormInput w-100 ffw-2 rgb-2 btn-sm dropdown-toggle"
                                            data-bs-toggle="dropdown">{sortName}</button>
                                    <ul className="dropdown-menu fborder rgb-bg-1 w-100">
                                        {titleSort}
                                        {seenSort}
                                        {popuSort}
                                        {proximity}
                                    </ul>
                                </div>
                                <div className="col-md-6 d-flex align-items-center mx-5">
                                    <input type="text" className="FFormInput h-50 w-100 my-2 me-2" id="search"
                                           onKeyPress={(ele) => {
                                               if (ele.key === 'Enter') this.setFilterSearch()
                                           }}
                                           placeholder="Search" value={this.state.searchTerm}
                                           onChange={this.setSearchTerm}/>
                                    <button className="bg-transparent border-0" onClick={this.setFilterSearch}>
                                        <img src={RsrcSearchIcon} height="30px" width="30px"
                                             className="hover-bg-dark fborder p-2" alt=""/>
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start" style={{flexWrap: 'wrap'}}>
                                {rendered}
                            </div>
                        </div>
                    </div>
                </main>
                <FFooter/>
            </div>
        );
    }

}

export default SearchMoviesPage;

