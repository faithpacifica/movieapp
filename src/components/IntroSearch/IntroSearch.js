import React from "react";
import { useState } from "react";
import Movie from "../Movies";
// import Loader from "../Loader";
import Intro from "../Intro";
import { MY_API_KEY } from "../../global";
// import apiCalls from "../../config/Api";

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&language=en-US&include_adult=false`;

const IntroSearch = () => {
  const [moviesList, setMoviesList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const handleSearch = (e) => {
    if (e.target.value.length > 2) {
      fetch(SEARCH_API + `&query=${e.target.value}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Serverda ma'lumot olishda xatolik!!");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data.results);
          setMoviesList(data.results);
          // setIsLoading(false);
        })
        .catch((err) => {
          // setIsLoading(false);
          setError(err.message);
        });

      //   const search = async () => {
      //     try {
      //         const data = await apiCalls.search({
      //           language: "en-US",
      //           include_adult: false,
      //           query: e.target.value
      //         });
      //         setMoviesList(data.results);
      //         setIsLoading(false);
      //     } catch (error) {
      //        setIsLoading(false);
      //         setError(error.message);
      //     }
      // }

      // search();
    }
  };

  const mappedMovies = moviesList.map((el) => {
    return <Movie className="movies-wrapper" movieobj={el} key={el.id} />;
  });

  return (
    <>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="intro-search">
          <Intro handleSearch={handleSearch} />
          <div className="container">
            <h2 className="intro-search__heading">Searched Results</h2>
            <div className="intro-searched-results">{mappedMovies}</div>
            <hr className="intro-search__divider" />
          </div>
        </div>
      )}
    </>
  );
};

export default IntroSearch;
