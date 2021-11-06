import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { BY_GENRES } from "../global";
import Movie from "./Movies";
import usePrevious from "../hooks";
import { MY_API_KEY } from "../global";

const TOP_MOVIES_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${MY_API_KEY}`;

const Row = styled.div`
padding:25px;
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
  background-color: #fff;
`;

const CatalogTitle = styled.h2`;
    color:white; 
    font-weight: 700;
    font-size: 30px;
    line-height: 48px;
    margin-bottom: 10px;
`;

const Button =styled.button`
  border:none;
  padding: 12px 15px;
  background-color:#032541;
  font-size:16px;
  font-weight:bold;
  border-radius:4px;
  margin-top:20px;
  color:white;
  &:hover{
    background-color:#01B4E4;
    color:white;
  }
`;

const MovieGrid = (props) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const prevGenre = usePrevious(props.genre);
  const prevPage = usePrevious(page);

  const loadMore = () => {
    setPage(page + 1);
    console.log(page);
  };

  useEffect(() => {
    let list;
    if (prevGenre != props.genre) { /*ekranni tozalab, davomidan qushyapti */
      list = []; 
    } else if(prevPage === page) {   
      list = []; 
    }
    else {
      list = movies;
    }

    if (props.genre == undefined) {
      // default da TOP movie larni chiqarish
      fetch(TOP_MOVIES_API)
        .then((res) => res.json())
        .then((data) => {
          // 20 + 20 kino quyish
          setMovies(list.concat(data.results));
          setTotalPage(data.total_pages);
        })

    } else {
        fetch(BY_GENRES + props.genre + "&page=" + page)
        .then((res) => res.json())
        .then((data) => {
          setMovies(list.concat(data.results));
          setTotalPage(data.total_pages); // 500 ta page 
        });
    }
    //   TODO:catch qushish
   
  }, [props.genre, page]);

  return (
    //TODO:S padding ochilmayapti
    <div className="moviesGrid-wrapper">
      <CatalogTitle className="catalog-title"> Movies count: {movies.length} </CatalogTitle>
      <Row>
        {movies.map((el, i) => (
          <Movie movieobj={el} key={i} />
        ))}
      </Row>

      {page < totalPage ? (
        // TODO:stillash
        <Button type="button" onClick={loadMore}>
          Load more
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieGrid;