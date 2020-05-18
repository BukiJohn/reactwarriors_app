import React from "react";
// import moviesData from "./moviesData";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import "./App.css";

// UI = fn(statem props)

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=3f4ca4f3a9750da53450646ced312397&sort_by=${this.state.sort_by}`
    )
      .then((response) => {
        console.log("then");
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        this.setState({
          movies: data.results,
        });
      });
  };

  // функция "Удалить фильм"
  removeMovie = (movie) => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    });
    console.log(updateMovies);
    this.setState({
      movies: updateMovies,
    });
  };
  // функция "Добавить в избранное"
  addMovieToWillWatch = (movie) => {
    console.log(movie);
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];
    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };
  // функция "Удалить из избранного"
  removeMovieFromWillWatch = (movie) => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function (
      item
    ) {
      return item.id !== movie.id;
    });
    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };

  updateSortBy = (value) => {
    this.setState({
      sort_by: value,
    });
  };

  render() {
    console.log(this);
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row">
              <MovieTabs
                sort_by={this.state.sort_by}
                updateSortBy={this.updateSortBy}
              />
              {this.state.movies.map((movie) => {
                return (
                  <div className="col-6" key={movie.id}>
                    <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
            <div className="col-3">
              <p>Will Watch: {this.state.moviesWillWatch.length}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
