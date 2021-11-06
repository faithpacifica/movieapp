import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MoviesCard = styled.div`
box-shadow: 0px 2px 6px 1px #0FB8BC;
  width:170px;
  flex-wrap: wrap;
 
`;
const MoviesImg = styled.img`
  display:block;
  height: 225px;
  border-radius: 10px;
  width: 100%;
  height: 100%;

`;
const MovieTitle = styled.h2`
    color: #000;
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

`;
const Movie = ({ movieobj }) => {
  const url = `/movie/${movieobj.id}`;

  return (
    <Link to={url} style={{textDecoration:'none', position:'relative', width:'170px', marginBottom:'10px', marginRight:'15px'}}>

      <MoviesCard className="movie" >
          <MoviesCardImgWrapper className='moviesCardImgWrapper'>
            <MoviesImg src={IMAGE_URL + movieobj.poster_path} alt={movieobj.title} />
            {/* TODO:NO IMAGE qushish */}
             <div className='movieCard-bg'></div>  
            <p className="view_movie_message">View Movie Details</p>
          </MoviesCardImgWrapper>
      </MoviesCard>

      <div className="movie_details">
          <MovieTitle className="movie-title"> {movieobj.title ? movieobj.title : movieobj.name} </MovieTitle>
          <ReleaseDate className="release-date">{movieobj.release_date}</ReleaseDate>
      </div>
    
     </Link>
  );
};

export default Movie;
