import {Component} from "react";

import MovieService from "../services/movie.service";
import UserService from "../services/user.service";

import FHeader from "../components/FHeader.js";
import FFooter from "../components/FFooter.js";
import FTagList from "../components/FTagList.js";
import FInvitePopup from "../components/FInvitePopup";

import RsrcIconArrowLeft from "../resources/icon_arrow_left_active.svg";
import RsrcIconArrowRight from "../resources/icon_arrow_right_active.svg";
import RsrcIconHeart from "../resources/icon_heart.svg";
import RsrcIconVomit from "../resources/icon_vomit.svg";
import {SessionContext} from "@inrupt/solid-ui-react";
import SolidUserService from "../services/solid.user.service";
import SolidMovieService from "../services/solid.movie.service";
import SolidContactsService from "../services/solid.contacts.service";

class HomePage extends Component {

    static contextType = SessionContext;
    static preloaded = ""
    static hasReaction = false

    constructor(props) {
        super(props)
        this.seenCheck = false;
        this.likeMovie = this.likeMovie.bind(this);
        this.dislikeMovie = this.dislikeMovie.bind(this);
        this.flipSeen = this.flipSeen.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {};
    }

    flipSeen() {
        this.seenCheck = !this.seenCheck
    }

    loadMovie() {
        this.setState({disableButtons: "disabled"})
        let prom;
        if (HomePage.preloaded === "")
            prom = MovieService.getRandomMovieInfo()
        else {
            prom = MovieService.getMovieInfo(HomePage.preloaded)
            HomePage.preloaded = ""
        }
        prom.then(data => {
            this.setState({expandDescription: false, disableButtons: "", movie: data})
            UserService.likeCount(data.id).then((likes) => this.setState({likes}))
            UserService.dislikeCount(data.id).then((dislikes) => this.setState({dislikes}))
        });
    }

    handleKeyPress(event) {
        if (this.state.disableButtons !== "disabled") {
            if (event.key === 'ArrowLeft') {
                this.dislikeMovie()
            } else if (event.key === 'ArrowRight') {
                this.likeMovie()
            }
        }
    }

    rateMovie(liked) {
        if (SolidUserService.isSolidUser(this.context.session)) {
            if (liked) {
                SolidMovieService.likeMovie(this.context.session, this.state.movie, this.seenCheck)
            }
        } else {
            UserService.createReaction(this.state.movie.id, liked, this.seenCheck)
        }
        this.loadMovie()
    }

    likeMovie() {
        this.rateMovie(true)
    }

    dislikeMovie() {
        this.rateMovie(false)
    }

    componentDidMount() {
        document.title = "Filmer: Home";
        document.addEventListener("keydown", this.handleKeyPress)
        this.loadMovie();
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress)
    }

    render() {
        const icon_width = "19px";
        const icon_width_2 = "33px";
        const icon_width_mobile = "27px";

        const movie = this.state.movie;
        if (movie) {
            const title = movie.original_title;
            const genres = movie.genres.map((element) => element.name);

            const description = movie.overview;
            const description_elips_length = 400;
            let description_rendered = <p>{description.slice(0, description_elips_length) + "... "}
                <button className="m-0 p-0 border-0 rgb-2 rgb-bg-tr ffw-2 hover-bg-dark"
                        onClick={() => this.setState({expandDescription: true})}>(read more)
                </button>
            </p>
            if (this.state.expandDescription || description.length < description_elips_length + 40) {
                description_rendered = <p>{description}</p>
            }

            let videos = movie.videos.results
            videos = videos.filter((x) => x.official === true).concat((x) => x.official = false)
            let video = videos.filter((x) => x.type === "Trailer")[0];
            if (typeof video === 'undefined') {
                video = movie.videos.results[0];
            }
            let video_rendered = <div className="rgb-2 d-flex justify-content-center align-items-center mb-5">video not
                available</div>;
            if (typeof video !== 'undefined') {
                video_rendered = <iframe height={video.size}
                                         src={"https://www.youtube.com/embed/" + video.key + "?autoplay=1&origin=http://filmer.lorreyne.be"}
                                         title={video.name} allow='autoplay; encrypted-media' frameBorder="0"
                                         allowFullScreen={true}></iframe>
            }

            const directors = [...new Set(movie.credits.crew.filter((x) => x.job === "Director").slice(0, 5).map((x) => x.name))];
            const writers = [...new Set(movie.credits.crew.filter((x) => (x.department === "Writing") && (x.job = "Screenplay")).slice(0, 5).map((x) => x.name))];
            const starring = [...new Set(movie.credits.cast.filter((x) => x.popularity > 15).slice(0, 5).map((x) => x.name).sort((x, y) => x.popularity - y.popularity))];

            let likes = this.state.likes;
            let dislikes = this.state.dislikes;
            if (likes === "" || dislikes === "") {
                likes = ""
                dislikes = ""
            }

            return (
                <div className="h-100 d-flex flex-column m-xl-0">
                    <FHeader/>
                    <main className="mx-0">
                        <div className="mb-5 d-flex justify-content-around">
                            <button
                                className={"btn col rounded d-none d-xl-flex justify-content-center align-items-center rgb-bg-2 hover-bg-dark mt-5 me-5 border-0 " + this.state.disableButtons}
                                onClick={this.dislikeMovie}>
                                <img src={RsrcIconArrowLeft} width={icon_width_2} className="me-3" alt=""/>
                                <img src={RsrcIconVomit} width={icon_width_2} alt=""/>
                            </button>
                            <div className="col-xl-7 ms-4 mt-3">
                                <div className="d-flex mb-5 mb-xl-0 justify-content-center">
                                    <div className="d-xl-none d-flex me-1">
                                        <button className={"col btn hover-bg-dark " + this.state.disableButtons}
                                                onClick={this.dislikeMovie}>
                                            <img src={RsrcIconArrowLeft} width={icon_width_mobile} className="me-3"
                                                 alt=""/>
                                            <img src={RsrcIconVomit} width={icon_width_mobile} alt=""/>
                                        </button>
                                    </div>
                                    <div className="d-xl-none d-flex">
                                        <button className={"col btn hover-bg-dark " + this.state.disableButtons}
                                                onClick={this.likeMovie}>
                                            <img src={RsrcIconHeart} width={icon_width_mobile} className="me-3" alt=""/>
                                            <img src={RsrcIconArrowRight} width={icon_width_mobile} alt=""/>
                                        </button>
                                    </div>
                                </div>
                                <label className="ffs-1 ffw-2 m-0 p-0">{title}</label>
                                <FTagList tags={genres}/>
                                <div className="d-xl-flex mt-4">
                                    <div className="col-xl-9 me-3">
                                        <div className="ratio ratio-21x9">
                                            {video_rendered}
                                        </div>
                                        <div className="d-flex mt-3 mb-2 align-items-center justify-content-between">
                                            <div className="d-flex">
                                                <div className="d-flex me-4">
                                                    <img src={RsrcIconHeart} width={icon_width} className="me-2"
                                                         alt=""/>
                                                    <label className="ffs-2">{likes}</label>
                                                </div>
                                                <div className="d-flex me-4">
                                                    <img src={RsrcIconVomit} width={icon_width} className="me-2"
                                                         alt=""/>
                                                    <label className="ffs-2">{dislikes}</label>
                                                </div>
                                            </div>
                                            {SolidUserService.isSolidUser(this.context.session) && <FInvitePopup movie={this.state.movie}/>}
                                            {SolidUserService.isSolidUser(this.context.session) && <button type="button"
                                                                                                           className="btn btn-bg-solid hover-bg-solid rgb-bg-solid rgb-1 m-1"
                                                                                                           data-bs-toggle="modal"
                                                                                                           data-bs-target="#inviteModal">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <img className="me-1"
                                                         src="https://genr.eu/wp/wp-content/uploads/2018/10/logo.svg"
                                                         width="18px"/>
                                                    invite to watch
                                                </div>
                                            </button>}

                                            <div className="form-check form-switch me-4"
                                                 style={{transform: 'scale(1.5)'}}>
                                                <div className='d-flex align-items-center'>
                                                    <label className="form-check-label me-5 h6 mt-2"
                                                           style={{float: 'left', fontSize: '65%'}}
                                                           htmlFor="flexSwitchCheckDefault">Seen</label>
                                                    <input className="form-check-input mb-1" type="checkbox"
                                                           role="switch"
                                                           id="flexSwitchCheckDefault" onClick={() => this.flipSeen()}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 mt-auto">
                                            {description_rendered}
                                        </div>
                                    </div>
                                    <div className="col d-sm-flex d-xl-block justify-content-left ffw-2 ms-1">
                                        <div className="me-5 mb-3">
                                            <p className="m-0 p-0 mb-1 rgb-2">Director</p>
                                            {directors.map((element) => <p key={element} className="m-0 p-0">{element}</p>)}
                                        </div>
                                        <div className="me-5 mb-3">
                                            <p className="m-0 p-0 mb-1 rgb-2">Writer</p>
                                            {writers.map((element) => <p key={element} className="m-0 p-0">{element}</p>)}
                                        </div>
                                        <div>
                                            <p className="m-0 p-0 mb-1 rgb-2">Starring</p>
                                            {starring.map((element) => <p key={element} className="m-0 p-0">{element}</p>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                className={"btn col rounded d-none d-xl-flex justify-content-center align-items-center rgb-bg-2 hover-bg-dark mt-5 ms-5 border-0 " + this.state.disableButtons}
                                onClick={this.likeMovie}>
                                <img src={RsrcIconHeart} width={icon_width_2} className="me-3" alt=""/>
                                <img src={RsrcIconArrowRight} width={icon_width_2} alt=""/>
                            </button>
                        </div>
                    </main>
                    <FFooter/>
                </div>
            );
        } else {
            return (
                <div className="h-100 d-flex flex-column m-xl-0">
                    <FHeader/>
                    <main className="mx-0">
                        <div className="mt-5 pt-5 mb-auto d-flex justify-content-center">
                            <span className="spinner-border spinner-border-sm"/>
                        </div>
                    </main>
                    <FFooter/>
                </div>
            )
        }
    }


}

export default HomePage;
