import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
// import { BY_GENRES } from "../global";
import Movie from "./Movies";
import usePrevious from "../hooks";
// import { MY_API_KEY } from "../global";
import Loader from "./Loader";
import apiCalls from '../config/Api';

// const TOP_MOVIES_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${MY_API_KEY}`;

const Row = styled.div`
  padding:25px;
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
  background-color: #fff;
  @media only screen and (max-width:600px){
    justify-content:center;
  }
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

  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  
  const loadMore = () => {
    setPage(page + 1);
    console.log(page);
  };

  useEffect(() => {
    let list;
    if (prevGenre !== props.genre) { /*ekranni tozalab, davomidan qushyapti */
      list = []; 
    } else if(prevPage === page) {   
      list = []; 
    }
    else {
      list = movies;
    }

    if (props.genre === undefined) {
      // default da TOP movie larni chiqarish

      // fetch(TOP_MOVIES_API)
      // .then((res) => {
      //   if (!res.ok) {
      //     throw Error("Serverda ma'lumot olishda xatolik!!");
      //   }
      //   return res.json();
      // })
      //   .then((data) => {
      //     // 20 + 20 kino quyish
      //     setMovies(list.concat(data.results));
      //     setTotalPage(data.total_pages);
      //     setIsLoading(false)
      //   })
      //   .catch((err) => {
      //     setError(err.message);
      //     setIsLoading(false);
      //   });

        const getTopMovies = async () => {
          try {
              const data = await apiCalls.getMovies('top_rated');
              setMovies(data.results);
              setTotalPage(data.total_pages);
              setIsLoading(false)
          } catch (error) {
              setError(error.message);
              setIsLoading(false);
          }
      }
      
      getTopMovies();
      // const BY_GENRES = `https://api.themoviedb.org/3/discover/movie?api_key=${MY_API_KEY}&language=en-US&include_adult=false&with_genres=`;
    } else {
        // fetch(BY_GENRES + props.genre + "&page=" + page)
        // .then((res) => {
        //   if (!res.ok) {
        //     throw Error("Serverda ma'lumot olishda xatolik!!");
        //   }
        //   return res.json();
        // })
        // .then((data) => {
        //   // setMovies(list.concat(data.results));
        //   setMovies([...list, ...data.results ])
        //   setTotalPage(data.total_pages); 
        //   setIsLoading(false)// 500 ta page 
        // })
        // .catch((err) => {
        //   setError(err.message);
        //   setIsLoading(false);
        // });

        const getGenreMovies = async () => {
          try {
              const data = await apiCalls.discover(
                {
                language:'en-US',
                include_adult:false,
                with_genres: props.genre,
                page
                }
              );
              setMovies([...list, ...data.results ]);
              setTotalPage(data.total_pages);
              setIsLoading(false)

          } catch (error) {
              setError(error.message);
              setIsLoading(false);
          }
      }
      getGenreMovies()
    }
// eslint-disable-next-line react-hooks/exhaustive-deps

  }, [props.genre, page]);

  return (
   
    <div className="moviesGrid-wrapper">
      <CatalogTitle className="catalog-title"> Movies count: {movies.length} </CatalogTitle>
      {error ? <h3>{error}</h3> :''}
      {isLoading ? <Loader />: ''}
      {!isLoading && !error ?
      <Row className="moviesGrid-row">

        {movies.map((el, i) => (
          <Movie movieobj={el} key={i} />
        ))}
      </Row> : ''}
    {
       page < totalPage ? (
        
        <Button type="button" onClick={loadMore}>
          Load more
        </Button>
      ) : (
        ""
      )
    }
    
     
    </div>
  );
};

export default MovieGrid;
