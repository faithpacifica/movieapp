import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SimilarMoviesWrapper = styled.div`
width:170px;
  height: 200px;
  margin=-right: 10px;
  margin-bottom:85px;
`;

const SimilarMoviesImg = styled.img`
  height: 200px;
`;

const SimilarMoviesCard = ({ id,title, img, releaseDate, voteAverage }) => {
  return (
    <Link className = "similar-movies-wrapper" to={`/movie/${id}`}>
     <SimilarMoviesWrapper className="similar-movies-wrapper">
      <SimilarMoviesImg src={img} alt="actor image" />
      <p className="similar-movies-title">{title}</p>
      <p className="similar-movies-release"> <span>Release date: </span>{releaseDate}</p>
      <p className="similar-movies-vote">{Math.trunc(voteAverage*10)}%</p>
    </SimilarMoviesWrapper>
    </Link>

   
  );
};

export default SimilarMoviesCard;
