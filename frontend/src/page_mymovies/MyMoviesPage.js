import React, {Component} from "react";
import stringSimilarity from "string-similarity";

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";
import FMovieLine from "../components/FMovieLine";

import MovieService from "../services/movie.service";
import UserService from "../services/user.service";

import RsrcSearchIcon from "../resources/icon_search.svg";

class MyMoviesPage extends Component
{

  constructor(probs) {
    super(probs);
    this.setFilterSearch = this.setFilterSearch.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.sortOnSeen = this.sortOnSeen.bind(this);
    this.sortOnTitle = this.sortOnTitle.bind(this);
    this.sortOnDirectors = this.sortOnDirectors.bind(this);
    this.newSortOption = this.newSortOption.bind(this);
    this.newSearchOption = this.newSearchOption.bind(this);
    this.formatTitle = this.formatTitle.bind(this);
    this.formatDirector = this.formatDirector.bind(this);

    this.searchTerm = "";
    this.searchOption = "Title"
    this.sortName = "Sort"

    //movies: list of movie objects (see reference)
    //filter: functie die lijst van movies transformeert
    //searchFormat: een functie om een movie object naar een lijst van strings om te zetten voor de search
    this.state = {movies:[],filter:(ms)=>ms,searchFormat:this.formatTitle};
  }

    setSearchTerm(st){
      this.searchTerm = st.target.value
    }

    setFilter(filter){
      this.setState({filter})
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

    setFilterList(compare){
      this.setFilter(ms=>
          ms.filter(i=>this.getMaxLikeliness(i,compare)!==0)
              .sort((i,o)=>this.compareMaxLikeliness(i,o,compare)))
    }

    setFilterSearch(){
      this.sortName="Sort";
      let func = (x,term)=>stringSimilarity.compareTwoStrings(x, term)+(x.includes(term)?0.2:0);
      if (this.searchTerm.length === 1)
          func = (x,term)=>(x.split(term).length - 1) / x.length
      this.setFilterList(func)
    }

    compareMaxLikeliness(i,o,compare){
        return this.getMaxLikeliness(o,compare)
            - this.getMaxLikeliness(i,compare)
    }

    getMaxLikeliness(iS,compare){
      const i = this.state.searchFormat(iS)
      const upper = this.searchTerm.toUpperCase();
      if(upper.length===0)
          return 1
      const max = i.map(x=>
          compare(x.toUpperCase(),upper)
          )
      return Math.max.apply(Math,max)
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

    newSortOption(name,filter){
        const clickEvent = ()=>{
            this.sortName=name
            this.setFilter(ms=>ms.sort(filter))
        }
        return this.newDropDown(clickEvent,name)
    }

    newSearchOption(name,searchFormat){
      const clickEvent = ()=>{
          this.searchOption = name
          this.setState({searchFormat,filter:ms=>ms})
      }
      return this.newDropDown(clickEvent,name)
    }

    newDropDown(clickEvent,name){
      return    <li>
                    <a className="dropdown-item hover-bg-dark btn rounded-0" onClick={clickEvent}>{name}</a>
                </li>
    }

  componentDidMount()
  {
    UserService.getReactions().then((data)=>data.filter(movie=>movie.like).forEach(
        movie=>MovieService.getMovieInfo(movie.movie_id).then(
            info=> {
              if (info.error === undefined) {
                this.setState((prev, _) => ({movies: prev.movies.concat([{movie:info,seen:movie.seen}])}))
              }
            }
        )
    ))
    document.title = "Filmer: Where people find their favourite movies!";
  }

  render ()
  {
    const filteredMovies = this.state.filter(this.state.movies)
    const amount = filteredMovies.length
    let rendered = filteredMovies.map(ele=><FMovieLine movie={ele.movie} seen={ele.seen}/>);
    if(amount === 0) {
        let text = "Change your search term to see more movies!"
        if(this.state.movies.length===0)
            text = "Like movies on the homepage to view them here!"
        rendered = <div className="container-fluid mt-5">
            <h5>No movies to show.</h5>
            <h5>{text}</h5>
        </div>
    }
    const sortName = this.sortName

      const titleSort = this.newSortOption("Title",this.sortOnTitle)
      const directorSort = this.newSortOption("Directors",this.sortOnDirectors)
      const seenSort = this.newSortOption("Seen",this.sortOnSeen)

      const searchByTitle=this.newSearchOption("Title",this.formatTitle)
      const searchByDir = this.newSearchOption("Directors",this.formatDirector)
      const searchByGen = this.newSearchOption("Genres",this.formatGenres)

    return (
      <div className="h-100 d-flex flex-column m-3 m-xxl-0">
        <FHeader/>
        <main className="mb-5 container-fluid">
          <div className="my-5 d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-7 mx-sm-5 mb-5" >
              <p className="ffs-1 ffw-2 m-0 p-0 me-4">My movies ({amount})</p>
              <div className="d-sm-flex mt-4 justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="dropdown h-50 w-100">
                    <button type="button" className="FFormInput ffw-2 rgb-2 btn-sm dropdown-toggle" data-bs-toggle="dropdown">{sortName}</button>
                    <ul className="dropdown-menu fborder rgb-bg-1 w-100">
                        {titleSort}
                        {directorSort}
                        {seenSort}
                    </ul>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                    <div className="dropdown h-50 w-50">
                    <button type="button" className="FFormInput ffw-2 rgb-2 btn-sm dropdown-toggle" data-bs-toggle="dropdown">{this.searchOption}</button>
                    <ul className="dropdown-menu fborder rgb-bg-1 w-100">
                        {searchByTitle}
                        {searchByDir}
                        {searchByGen}
                    </ul>
                  </div>
                  <input type="text" className="FFormInput h-50 w-100 my-2 ms-2" id="search"
                         placeholder="Search"  onChange={this.setSearchTerm}/>
                  <button className="bg-transparent border-0" onClick={this.setFilterSearch}>
                        <img src={RsrcSearchIcon} height="35px" width="38px" className="ms-1 fborder p-2" alt=""/>
                  </button>
                  </div>
                <button className="btn btn-primary m-0 p-1 ffw-2 d-none d-sm-block disabled">Add movie</button>
                <button className="btn btn-primary m-0 p-1 ffw-2 d-sm-none w-100 my-3 disabled">Add movie</button>
              </div>
              {rendered}
            </div>
          </div>
        </main>
        <FFooter/>
      </div>
    );
  }

}

export default MyMoviesPage;

