import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SimilarMoviesWrapper = styled.div`
  // width: auto;
  height: 200px;
  margin-right: 15px;
  margin-bottom: 85px;
`;

const SimilarMoviesImg = styled.img`
  height: 200px;
  display:flex;
`;

const Poster = styled.div`
  border-radius: 8px;
  width: 150px;
  height: 200px;
  background-color: linear-gradient(to center, #c5c5c5, #e8e8e8);
`;
const NoImage = styled.img`
  border: 1px solid black;
  width: 140px;
  height: 200px;
  object-fit: cover;
`;

const SimMovieTitle = styled.p`
line-height: 1;
}
`;
const SimMovieInfo = styled.div`
  padding:5px 5px 0;
`;

const SimilarMoviesCard = ({ id, title, img, releaseDate, voteAverage }) => {
  return (
    <Link className="similar-movies-wrapper" to={`/movie/${id}`}>
      <SimilarMoviesWrapper className="similar-movies-wrapper">
        {img ? (
          <SimilarMoviesImg
            className="similar_movie-img"
            src={img}
            alt="movie image"
          />
        ) : (
          <Poster>
            <NoImage src="../../img/noimage.jpg" alt="no poster" />
          </Poster>
        )}
        <SimMovieInfo className="similar_movie_info">
          <SimMovieTitle className="similar-movies-title">
            {title}
          </SimMovieTitle>
          <p className="similar-movies-release">
            {" "}
            <span>Release date: </span>
            {releaseDate.slice(0,4)} 
          </p>
          <p className="similar-movies-vote">{Math.trunc(voteAverage * 10)}%</p>
        </SimMovieInfo>
      </SimilarMoviesWrapper>
    </Link>
  );
};

export default SimilarMoviesCard;
