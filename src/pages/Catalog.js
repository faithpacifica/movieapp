import React from "react";
import { MY_API_KEY } from "../global";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Genres from "../components/Genres";
import MovieGrid from "../components/MovieGrid";
import styled from "styled-components";

const SINGLE_MOVIE_API = "https://api.themoviedb.org/3/movie/";


const CatalogPage = styled.div `
background-color:#141414;
`;

const GenresTable = styled.div`
width:18%;
`;

const MoviesGridBox = styled.div`
  width:82%;
`;

const API_PARAMS = `?api_key=${MY_API_KEY}&language=en-US`;

const GENRES = `${SINGLE_MOVIE_API}list${API_PARAMS}`;

const Catalog = () => {
const {genreid} = useParams();

  return (
    <CatalogPage className = 'catalog-page'>
        <div className="container">
      <div className="catalogPage">
        <GenresTable className="genres_table">
          <Genres />
        </GenresTable>

        <MoviesGridBox className="movies_grid_box">
          <MovieGrid genre={genreid}/>
        </MoviesGridBox>
      </div>
    </div>
    </CatalogPage>
  
  );
};

export default Catalog;
