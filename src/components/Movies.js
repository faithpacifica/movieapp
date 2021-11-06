import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MoviesCard = styled.div`
  box-shadow: 0px 2px 6px 1px #0fb8bc;
  min-width: 170px;
  flex-wrap: wrap;
  margin-bottom:10px;
`;
const MoviesImg = styled.img`
  display: block;
  height: 170px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;
const MovieTitle = styled.h2`
  color: #17b7da;
  font-weight: 600;
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
  height:255px;
`;

const Poster = styled.div`
border-radius: 8px;
height:255px;
width: 170px;
background-color:linear-gradient( to center, #C5C5C5, #E8E8E8);
`;
const NoImage = styled.img`
height:100%;
border: 1px solid black;
width: 170px;
display:flex;
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
         {
           (movieobj.poster_path) ? <MoviesImg
           src={IMAGE_URL + movieobj.poster_path}
           alt={movieobj.title}
         /> :
          <Poster>
          <NoImage src="../img/noimage.jpg" alt="no poster" />
        </Poster>  
         } 

          <div className="movieCard-bg"></div>
          <p className="view_movie_message">View Movie Details</p>
        </MoviesCardImgWrapper>
      </MoviesCard>

      <div className="movie_details">
        <MovieTitle className="movie-title">
          {" "}
          {movieobj.title ? movieobj.title : movieobj.name}{" "}
        </MovieTitle>
        <ReleaseDate className="release-date">
          {movieobj.release_dateslice(0,4)}
        </ReleaseDate>
      </div>
    </Link>
  );
};

export default Movie;
