import React, {Component} from "react";
import stringSimilarity from "string-similarity";
import {withRouter} from "../tools/WithRouter";

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";
import FMovieLine from "../components/FMovieLine";
import RsrcIconArrowLeft from "../resources/icon_arrow_left.svg";
import RsrcIconArrowRight from "../resources/icon_arrow_right.svg";
import RsrcIconArrowLeftActive from "../resources/icon_arrow_left_active.svg";
import RsrcIconArrowRightActive from "../resources/icon_arrow_right_active.svg";

import MovieService from "../services/movie.service";
import UserService from "../services/user.service";

import RsrcSearchIcon from "../resources/icon_search.svg";
import RsrcPukeIcon from "../resources/icon_vomit.svg";

class MyMoviesPage extends Component
{

  constructor(probs) {
    super(probs);
    this.setFilterSearch = this.setFilterSearch.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.changePage = this.changePage.bind(this);
    this.sortOnSeen = this.sortOnSeen.bind(this);
    this.sortOnTitle = this.sortOnTitle.bind(this);
    this.sortOnDirectors = this.sortOnDirectors.bind(this);
    this.sortOnScore = this.sortOnScore.bind(this);
    this.goToAddMovies = this.goToAddMovies.bind(this)
    this.newSortOption = this.newSortOption.bind(this);
    this.newSearchOption = this.newSearchOption.bind(this);

    this.formatTitle = this.formatTitle.bind(this);
    this.formatDirector = this.formatDirector.bind(this);
    this.formatGenres = this.formatGenres.bind(this);

    this.maxOnPage=20

    this.searchTerm = "";
    this.proposedFormat = this.formatTitle;
    this.sortName = "Sort";
    this.searchView = false;
    this.allMovies = -1
    //movies: list of movie objects (see reference)
    //sorter: een compare die 2 movie objecten neemt, en een gelijkenis tussen -1 en 1 teruggeeft
    //searchOption: naam van de gekozen zoek optie
    //score: neemt een movie en geeft een gelijkenis met de zoekterm terug. Wordt gebruikt door sorteren en filter
    this.state = {movies:new Map([["",{}]]),page:1,sorter:(i,o)=>0,searchOption:"Title",score:(i)=>1};
  }

    changePage(inc){
      this.setState((prev,_)=>({page:prev.page+inc}));
    }

    goToAddMovies(){
      this.props.navigate("/addmovies")
        window.location.reload();
    }

    setSearchTerm(st){
      this.searchTerm = st.target.value
    }

    sortOnSeen(i,o){
     return (i.seen===o.seen)?0:(i.seen)?1:-1
    }

    sortOnTitle(i,o){
      return (i.movie.original_title===o.movie.original_title)?0:
                            (i.movie.original_title>o.movie.original_title)?1:-1
    }

    sortOnDirectors(i,o){
      const id = i.movie.credits.crew.filter(x=>x.job==="Director").slice(0,3)
        .map(x=>x.name).sort()
      const od = o.movie.credits.crew.filter(x=>x.job==="Director").slice(0,3)
        .map(x=>x.name).sort()
      for(let ind =0;ind<3;ind++){
          if(id.length<=ind && od.length<=ind)
              return 0
          if(id.length<=ind)
              return -1
          if(od.length<=ind)
              return 1
          if(id[ind]<od[ind])
              return -1
          if(id[ind]>od[ind])
              return 1
      }
      return 0
    }

    sortOnScore(i,o){
        return this.state.score(o)
            - this.state.score(i)
    }

    setFilterSearch(){
      const format = this.proposedFormat;
      const finalTerm = this.searchTerm.toUpperCase();

      let score = (x)=>stringSimilarity.compareTwoStrings(x, finalTerm)+(x.includes(finalTerm)?0.2:0);
      if (finalTerm.length === 1)
          score = (x)=>(x.split(finalTerm).length - 1) / x.length;
      if(finalTerm.length===0) {
          score = (x)=>1
          if(this.sortName==="Search"){
              this.sortName="Sort";
              this.state.sorter = (i,o)=>0
          }
      } else {
          this.sortName="Search"
          this.state.sorter = this.sortOnScore
      }

      this.searchView = finalTerm.length!==0;
      this.setState({page:1,score:iS=>{
            const i = format(iS)
            const max = i.map(x=>
                score(x.toUpperCase())
            )
            return Math.max.apply(Math,max)
            }
      })
    }

    formatTitle(movie){
      return [movie.movie.original_title]
    }

    formatDirector(movie){
      return movie.movie.credits.crew.filter(x=>x.job==="Director").slice(0,3)
            .map(x=>x.name)
    }

    formatGenres(movie){
      return movie.movie.genres.map(x=>x.name)
    }

    newSortOption(name,sorter){
        const clickEvent = ()=>{
            this.sortName=name
            this.setState({sorter})
        }
        return this.newDropDown(clickEvent,name)
    }

    newSearchOption(searchOption,searchFormat){
      const clickEvent = ()=>{
          this.proposedFormat = searchFormat
          this.setState({searchOption})
      }
      return this.newDropDown(clickEvent,searchOption)
    }

    newDropDown(clickEvent,name){
      return    <li>
                    <a className="dropdown-item hover-bg-dark btn rounded-0" onClick={clickEvent}>{name}</a>
                </li>
    }

  componentDidMount()
  {
    UserService.getReactions().then((data)=> {

        let filtered = data.filter(movie => movie.like)
        this.allMovies = filtered.length
        this.setState({movies:new Map()})
        filtered.forEach(movie=> {
            MovieService.getMovieInfo(movie.movie_id).then(info => {
                    this.setState(prev=>{
                        prev.movies.set(movie.movie_id,{movie:info,seen:movie.seen})
                        return prev
                    })
                }
            )
        })
    })
    document.title = "Filmer: My Movies";
  }

  render ()
  {
      let movies  = Array.from(this.state.movies.values())
      if(movies.length!==this.allMovies){
      return(
        <div className="container h-100 d-flex flex-column align-items-center">
          <FHeader/>
          <div className="mb-auto mt-auto text-center">
            <span className="spinner-border spinner-border-sm me-3"/>
          </div>
          <FFooter/>
        </div>
      );
    }
    const minimum_likelihood = 0.2;

    const filteredMovies = movies.sort(this.state.sorter)
        .filter(i=>this.state.score(i)>=minimum_likelihood)
    const amount = filteredMovies.length
    let rendered = filteredMovies.slice(this.maxOnPage*(this.state.page-1),this.maxOnPage*this.state.page).map(ele=>{
        return <FMovieLine movie={ele.movie} seen={ele.seen} renderButtons={true} renderInfo={true} onSeen={()=>{
            UserService.changeReaction(ele.movie.id,true,!ele.seen)
            this.setState(prev=>{
                prev.movies.set(ele.movie.id.toString(),{movie:ele.movie,seen:!ele.seen})
                return prev
            })
        }}
        onReact={()=>{
            this.allMovies--;
            UserService.changeReaction(ele.movie.id,false,ele.movie.seen)
            this.setState(prev=>{
                prev.movies.delete(ele.movie.id.toString())
                return prev
            })
        }
        } reactIcon={RsrcPukeIcon} isLinked={false}/>});
    if(amount === 0) {
        let text = "Like movies on the homepage to view them here!"
        if(this.searchView)
            text = "Change your search term to see more movies!"
        rendered = <div className="container-fluid mt-5">
            <h5>No movies to show.</h5>
            <h5>{text}</h5>
        </div>
    }

    let proximity =<div/>
    if(this.searchView){
        proximity = this.newSortOption("Search",this.sortOnScore)
    }

    let prevPage = (this.state.page===1) ?
        (<button className="btn" disabled>
          <img src={RsrcIconArrowLeft} width="21px"/>
        </button>) :
        (<button className="btn" onClick={()=>this.changePage(-1)}>
          <img src={RsrcIconArrowLeftActive} width="21px"/>
        </button>);
      let nextPage = (this.state.page>=Math.ceil(filteredMovies.length/this.maxOnPage)) ?
        (<button className="btn disabled" disabled>
          <img src={RsrcIconArrowRight} width="21px"/>
        </button>) :
        (<button className="btn" onClick={()=>this.changePage(1)}>
          <img src={RsrcIconArrowRightActive} width="21px"/>
        </button>);


    const sortName = this.sortName;
    const searchOption = this.state.searchOption;

      const titleSort = this.newSortOption("Title",this.sortOnTitle)
      const directorSort = this.newSortOption("Directors",this.sortOnDirectors)
      const seenSort = this.newSortOption("Seen",this.sortOnSeen)

      const searchByTitle=this.newSearchOption("Title",this.formatTitle)
      const searchByDir = this.newSearchOption("Directors",this.formatDirector)
      const searchByGen = this.newSearchOption("Genres",this.formatGenres)
    return (
      <div className="h-100 d-flex flex-column m-3 m-xl-0">
        <FHeader/>
        <main className="mb-5 container-fluid">
          <div className="my-5 d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-7 mx-md-5 mb-5" >
              <p className="ffs-1 ffw-2 m-0 p-0 me-4">My movies ({amount})</p>
              <div className="d-md-flex mt-4 justify-content-between align-items-center">
                  <div className="col-md-2 dropdown h-50">
                    <button type="button" className="FFormInput w-100 ffw-2 rgb-2 btn-sm dropdown-toggle" data-bs-toggle="dropdown">{sortName}</button>
                    <ul className="dropdown-menu fborder rgb-bg-1 w-100">
                        {titleSort}
                        {directorSort}
                        {seenSort}
                        {proximity}
                    </ul>
                  </div>
                <div className="col-md-6 d-flex align-items-center">
                  <input type="text" className="FFormInput h-50 w-100 my-2 me-2" id="search"
                         placeholder="Search"  onChange={this.setSearchTerm}/>
                  <div className="col-xl-3 dropdown">
                    <button type="button" className="FFormInput w-100 ffw-2 rgb-2 btn-sm dropdown-toggle" data-bs-toggle="dropdown">{ searchOption}</button>
                    <ul className="dropdown-menu fborder rgb-bg-1 w-100">
                        {searchByTitle}
                        {searchByDir}
                        {searchByGen}
                    </ul>
                  </div>
                  <button className="bg-transparent border-0" onClick={this.setFilterSearch}>
                        <img src={RsrcSearchIcon} height="30px" width="30px" className="hover-bg-dark fborder p-2" alt=""/>
                  </button>
                </div>
                <button className="btn btn-primary m-0 p-1 ffw-2 d-none d-md-block " onClick={this.goToAddMovies} >Add movie</button>
                <button className="btn btn-primary m-0 p-1 ffw-2 d-md-none w-100 my-3 " onClick={this.goToAddMovies} >Add movie</button>
              </div>
              {rendered}
              <div className="d-flex pt-5 m-5 m-xl-0 justify-content-center align-items-baseline">
                  {prevPage}
                  <p className="ffw-2 mx-2">page {this.state.page}</p>
                  {nextPage}
              </div>
            </div>
          </div>
        </main>
        <FFooter/>
      </div>
    );
  }

}

export default withRouter(MyMoviesPage);

