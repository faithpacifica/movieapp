import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { MY_API_KEY } from "../global";
import { ORIGINAL_IMAGE_URL } from "../global";
import styled from "styled-components";
import SwiperCore, { Autoplay } from "swiper";
import { Link } from "react-router-dom";

const POPULAR_MOVIES_API = `https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}`;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
// const TRAILER_URL =`https://api.themoviedb.org/3/movie/574060/videos?api_key=${MY_API_KEY}`;

const SingleMovieImg = styled.img`
  width: 300px;
  height: 400px;
  border-radius: 10px;
  margin-right: 30px;
`;

const BackDrop = styled.div`
  color: white;
  background-color: lightgray;
  background-repeat: no-repeat;
  background-size: cover;
  height: 470px;
  z-index: 1;
`;

const SliderWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  color: white;
`;

const Slider = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  // const [trailer, setTrailer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  SwiperCore.use([Autoplay]);

  useEffect(() => {
    fetch(POPULAR_MOVIES_API)
      .then((res) => {
        if (!res.ok) {
          throw Error("Serverda ma'lumot olishda xatolik!!");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setPopularMovies(data.results.slice(0, 4));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  // useEffect(() => {
  //   fetch(TRAILER_URL)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw Error("Serverda ma'lumot olishda xatolik!!");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data.results);
  //       // setTrailer(data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       setError(err.message);
  //     });
  // }, []);

  return (
    <SliderWrapper className="slider-wrapper">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {popularMovies.map((el) => (
          <SwiperSlide key={el.id}>
            <BackDrop
              className="inner-div"
              style={{
                backgroundImage: `url(${
                  ORIGINAL_IMAGE_URL + el.backdrop_path
                })`,
              }}
            >
              <div className="container">
                <MovieInfo className="movie-info">
                  <SingleMovieImg
                    className="single-movie-img"
                    src={IMAGE_URL + el.poster_path}
                    alt="movie image"
                    style={{
                      border: "1px solid #2A3034",
                    }}
                  />
                  <div className="movie-content">
                    <div className="movie-content-inner_div">
                      <h2 className="movie-content-title">
                        {" "}
                        {el.title}
                        <span className="movie-content-release_date">
                          ({el.release_date.slice(0, 4)})
                        </span>
                      </h2>
                    </div>

                    <div className="actions">
                      {/* PROGRESS BAR */}
                      <div className="progress-container">
                        <div className="progress">
                          <span
                            className="title timer"
                            data-from="0"
                            data-to={el.vote_average}
                            data-speed="1500"
                          >
                            {el.vote_average * 10}%
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

                      <a
                        className="no_click play_trailer"
                        href="#"
                        target="_blank"
                        data-site="YouTube"
                        data-id=""
                        data-title="Play trailer"
                      >
                        <i className="fas fa-play"></i>
                        Play trailer
                      </a>
                    </div>
                    <h2 className="movie-overview-title">Overview</h2>
                    <p className="movie-overview">{el.overview}</p>
                  </div>
                </MovieInfo>
              </div>
            </BackDrop>
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderWrapper>
  );
};

export default Slider;
