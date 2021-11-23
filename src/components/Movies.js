import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MoviesCard = styled.div`
  box-shadow: 0px 2px 6px 1px #0fb8bc;
  max-width: 100%;
  height: 320px;
  flex-wrap: wrap;
  margin-bottom: 10px;

  @media only screen and (max-width:480px){
    height:220px;
    object-fit:contain;
  }
  @media only screen and (max-width:600px){
    height:235px;
    object-fit:contain;
  }
  
`;
const MoviesImg = styled.img`
  display: block;
  height: 170px;
  // width: 100%;
  height: 100%;
`;
const MovieTitle = styled.h2`
  color: #17b7da;
  font-weight: bold;
  font-size: 1em;
  margin: 0;
  width: 100%;
  overflow-wrap: break-word;
  line-height: 0.9;
`;
const ReleaseDate = styled.p`
  font-size: 0.8em;
  margin: 0;
  padding: 0;
  color: #908b8b;
`;
const MoviesCardImgWrapper = styled.div`
  height: 250px;
  border-radius: 10px;

  img {
    width: 100%;
  }
`;

const Poster = styled.div`
  border-radius: 8px;
  height: 250px;
  width: 170px;
  background-color: linear-gradient(to center, #c5c5c5, #e8e8e8);
`;
const NoImage = styled.img`
  height: 100%;
  border: 1px solid black;
  width: 170px;
  display: flex;
  object-fit: cover;
`;

const Movie = ({ movieobj }) => {
  const url = `/movie/${movieobj.id}`;

  return (
    <Link
      to={url}
      style={{
        textDecoration: "none",
        position: "relative",
        width: "170px",
        marginBottom: "10px",
        marginRight: "15px",
      }}
    >
      <MoviesCard className="movie">
        <MoviesCardImgWrapper className="moviesCardImgWrapper">
          {movieobj.poster_path ? (
            <MoviesImg
              src={IMAGE_URL + movieobj.poster_path}
              alt={movieobj.title}
            />
          ) : (
            <Poster>
              <NoImage src="../img/noimage.jpg" alt="no poster" />
            </Poster>
          )}

          <div className="movieCard-bg"></div>
          <p className="view_movie_message">View Movie Details</p>
        </MoviesCardImgWrapper>

        <div className="movie_details">
          <MovieTitle className="movie-title">
            {" "}
            {movieobj.title ? movieobj.title : movieobj.name}{" "}
          </MovieTitle>
          <ReleaseDate className="release-date">
            {[movieobj.release_date].slice(0, 4)}
          </ReleaseDate>
        </div>
      </MoviesCard>
    </Link>
  );
};

export default Movie;
