import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { MY_API_KEY } from "../global";
import styled from "styled-components";
import { ORIGINAL_IMAGE_URL } from "../global";
import ActorCard from "../components/ActorCard";
import SimilarMoviesCard from "../components/SimilarMoviesCard";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import apiCalls from "../config/Api";
import ShowTrailer from "../components/ShowTrailer/ShowTrailer";

// const SINGLE_MOVIE_API = "https://api.themoviedb.org/3/movie/";
// const API_PARAMS = `?api_key=${MY_API_KEY}&language=en-US`;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const SingleMoviePage = styled.div`
  padding-top: 110px;
  color: black;
`;
const SingleMovieImg = styled.img`
  width: 300px;
  height: 400px;
  border-radius: 10px;
  margin-right: 30px;
`;
// const SingleMoviePageBg = styled.img`
//   position: absolute;
//   top: 0;
//   right: 0;
//   left: 0;
//   bottom: 0;
//   width: 100vw;
//   height: 100vh;
//   z-index: 0;
//   object-fit: cover;
//   object-position: center;
// `;
const BackDrop = styled.div`
  background-color: lightgray;
  background-repeat: no-repeat;
  background-size: cover;
  height: 460px;
  z-index: 0;
  margin-bottom: 60px;
`;
const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 50px;
  color: white;
`;

const ViewMovie = (props) => {
  const [movieInfo, setMovieInfo] = useState({});
  const [actorsList, setActorInfo] = useState([]);
  const [error, setError] = useState();
  const [similarMovieInfo, setSimilarMovieInfo] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    console.log(id);

    // fetch(SINGLE_MOVIE_API + id + API_PARAMS)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setMovieInfo(data);
    //   });

    const getSingleMovie = async () => {
      try {
        const data = await apiCalls.detail(id);
        console.log(data);
        setMovieInfo(data);
        // setIsLoading(false);
      } catch (error) {
        setError(error.message);
        // setIsLoading(false);
      }
    };
    getSingleMovie();

    // ACTORS

    // fetch(SINGLE_MOVIE_API + id + "/credits" + API_PARAMS)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw Error("Serverda ma'lumot olishda xatolik!!");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setActorInfo(data.cast);
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //   });

    const getActors = async () => {
      try {
        const data = await apiCalls.actorsAndCast(id);
        setActorInfo(data.cast);
        // setIsLoading(false)
      } catch (error) {
        setError(error.message);
        // setIsLoading(false);
      }
    };
    getActors();

    // SIMILAR

    // fetch(SINGLE_MOVIE_API + id + "/similar" + API_PARAMS)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setSimilarMovieInfo(data.results);
    //   });

    const similarMovies = async () => {
      try {
        const data = await apiCalls.similar(id);
        setSimilarMovieInfo(data.results);
        // setIsLoading(false)
      } catch (error) {
        setError(error.message);
        // setIsLoading(false);
      }
    };
    similarMovies();
  }, [id]);

  function handleClick() {
    history.go(-1);
  }

  const mappedActors = actorsList.map((actor, i) => (
    <ActorCard
      key={i}
      id={actor.id}
      name={actor.original_name}
      imgLink={actor.profile_path}
      charName={actor.character}
    />
  ));

  const similarMovies = similarMovieInfo.map((el, i) => (
    <SimilarMoviesCard
      id={el.id}
      key={i} /* doim key kerak */
      title={el.title}
      img={IMAGE_URL + el.poster_path}
      releaseDate={el.release_date.slice(0, 4)}
      voteAverage={el.vote_average}
    />
  ));

  return (
    <>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <SingleMoviePage className="singleMoviepage">
          <BackDrop
            className="inner-div"
            style={{
              backgroundImage: `url(${
                ORIGINAL_IMAGE_URL + movieInfo.backdrop_path
              })`,
            }}
          >
            <div className="container">
              <MovieInfo className="movie-info">
                <SingleMovieImg
                  className="single-movie-img"
                  src={IMAGE_URL + movieInfo.poster_path}
                  alt="movie photo"
                />
                <div className="movie-content">
                  <div className="movie-content-inner_div">
                    <h2 className="movie-content-title">
                      {" "}
                      {movieInfo.title}
                      <span className="movie-content-release_date">
                        {/* ({movieInfo.release_date.slice(0,4)})   TODO: year ni uzini chiqazolmadim  */}
                      </span>
                    </h2>
                  </div>

                  <span className="movie_genres">
                    {movieInfo.hasOwnProperty("genres")
                      ? movieInfo.genres.map((genre, index) => (
                          <span key={index}> {genre.name} </span>
                        ))
                      : null}
                  </span>

                  <div className="actions">
                    {/* PROGRESS BAR */}
                    <div className="progress-container">
                      <div className="progress">
                        <span
                          className="title timer"
                          data-from="0"
                          data-to={movieInfo.vote_average}
                          data-speed="1500"
                        >
                          {movieInfo.vote_average * 10}%
                        </span>
                        <div className="overlay"></div>
                        <div className="left"></div>
                        <div className="right"></div>
                      </div>
                    </div>

                    <div className="icons-container">
                      <div className="icons-wrapper">
                        <i className="fas fa-list"></i>
                      </div>
                      <div className="icons-wrapper">
                        <i className="fas fa-heart"></i>
                      </div>
                      <div className="icons-wrapper">
                        <i className="fas fa-bookmark"></i>
                      </div>
                      <div className="icons-wrapper">
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                    {/* 
                      <Link
                        className="no_click play_trailer"
                        to="/"
                        data-site="YouTube"
                        data-id=""
                        data-title="Play trailer"
                      >
                        <i className="fas fa-play"></i>
                        Play trailer
                      </Link> */}

                    <ShowTrailer id={id} />
                  </div>
                  <h2 className="movie-overview-title">Overview</h2>
                  <p className="movie-overview">{movieInfo.overview}</p>
                </div>
              </MovieInfo>
            </div>
          </BackDrop>

          <div className="container">
            <div className="cards-gap">
              <h2 className="heading">Casted Actors</h2>
              <div className="actors-wrapper cards-wrapper">{mappedActors}</div>
            </div>

            <div className="cards-gap">
              <h2 className="heading">Similar Movies</h2>
              <Link to="/" className="movies-wrapper cards-wrapper">
                {similarMovies}
              </Link>
            </div>
          </div>
          <button
            className="custom-btn btn-2"
            type="button"
            onClick={handleClick}
          >
            Back
          </button>
        </SingleMoviePage>
      )}
    </>
  );
};

export default ViewMovie;
