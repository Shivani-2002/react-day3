import {useState,useEffect} from 'react';
import './App.css';

function App() {

  let [movieInfo,setMovieInfo] = useState(null);
  let [title,setTitle] = useState("frozen");

  useEffect(()=>{
    // getMovieData();
  },[])

  function readTitle(value){
    setTitle(value);
  }

  function getMovieData(){
    // let url = `https://omdbapi.com/?t=the avengers&apikey=784a9d41`;
    let url = `https://omdbapi.com/?t=${title}&apikey=784a9d41`;

    fetch(url)
    .then((response) => response.json())
    .then((movie)=>{
      console.log(movie);
      setMovieInfo(movie);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (

    <div className="App">
      <img className="img-poster" alt="Movie poster" src={movieInfo?.Poster}/>
      <div className="container">
          <div className="padd">
              <h2>Movie Search</h2>
              <div className="input-group">
                <input className="search-field" type="text" placeholder="Enter a movie name" onChange={(event)=> {readTitle(event.target.value)}}></input>
                <button className="btn" onClick={getMovieData}>Get Movie</button>
              </div>
            </div>
          {
            movieInfo?.Error===undefined?(
          <div className="movie-container">
          <div className="movie">
              <div className="poster">
                <img className="img-poster" alt="Movie poster" src={movieInfo?.Poster}/>
              </div>
              <div className="details">
                 <div className="padd">
                      <h1>{movieInfo?.Title}</h1>
                      <p><strong>Genre</strong> : {movieInfo?.Genre}</p>
                      <p><strong>Directed By</strong> : {movieInfo?.Director}</p>
                      <p><strong>Plot</strong> : {movieInfo?.Plot}</p>
                      <p><strong>Cast</strong> : {movieInfo?.Actors}</p>
                      <p><strong>Box Office</strong> : {movieInfo?.BoxOffice}</p>
                      <p><strong>Language</strong> : {movieInfo?.Language}</p>
                      <p><strong>Release Date</strong> : {movieInfo?.Released}</p>
                      <p><strong>Runtime</strong> : {movieInfo?.Runtime}</p>

                      <div className="ratings">
                        {
                          movieInfo?.Ratings.map((rating,index) => 
                          (
                            <div key="index">
                                <strong>
                                  {rating.Source}
                                </strong>
                                <h3>
                                  {rating.Value}
                                </h3>
                            </div>
                          ))
                        }
                      </div>
                 </div>
              </div>
          </div>
     </div>
          ):
          (<h3>Movie Not Found !!! :(</h3>)
        }
      
     </div>
    </div>
  );
}

export default App;
