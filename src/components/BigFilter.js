import React from "react";
import styled from "styled-components";
import Select from "react-select";
import { useState, useEffect } from "react";
// import { MY_API_KEY } from "../global";
import Movie from "./Movies";
import apiCalls from "../config/Api";

// const API_PARAMS = `?api_key=${MY_API_KEY}&language=en-US`;
// const GENRES = `https://api.themoviedb.org/3/genre/movie/list${API_PARAMS}`;

const InputGap = styled.div`
  margin-bottom: 25px;
  width: 800px;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  color: white;
  align-items: center;
  font-size: 20px;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  display: block;
`;

const BigSearchTitle = styled.h1`
  margin-bottom: 30px;
  color: white;
`;

const SearchedMovies = styled.div`
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: space-around;
`;

const SearchButton = styled.button`
  color: white;
  padding: 10px 18px;
  border-radius: 4px;
  font-size: 18px;
  background-color: #01b4e4;
  border: none;
  font-weight: bold;
`;

const BigFilter = () => {
  const [sort, setSort] = useState("");
  const [year, setYear] = useState("");
  const [total, setTotal] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);
  const [genre, setGenre] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [error, setError] = useState();

  // const SORT_BY_ALL = `https://api.themoviedb.org/3/discover/movie?api_key=
  // ${MY_API_KEY}&language=en-US&sort_by=${sort}.desc&include_adult=false&page=1&year=${year}&with_genres=${genre}`;


  // GENRE larni SERVERDAN OLIB KELISH

  useEffect(() => {
    // fetch(GENRES)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw Error("Serverda ma'lumot olishda xatolik!!");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setGenreList(data.genres);
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //   });

  const getGenres = async () => {
    try {
        const data = await apiCalls.genre();
        setGenreList(data.genres);
        // setIsLoading(false)
    } catch (error) {
        setError(error.message);
    }
}

getGenres();

  }, []);

  const handleGenreChange = (newValue) => {
    console.log(newValue);
    const mappedGenre = newValue.map((el) => el.value);
    // men tanlayotgan janrlarimni olib join qilib beradi
    console.log(mappedGenre);
    setGenre(`${mappedGenre}`);
    // setGenre(mappedGenre.join(','));
    // console.log(setGenre(mappedGenre.join('')))
    console.log(`${mappedGenre}`);
  };

  //  Serverdan kelgan genres ni map qilib, id si va nomini olamiz(umumiy)
  const newGenreArr = genreList.map((el) => {
    return { value: el.id, label: el.name };
  });

  // -----------------------------------------------------------------------------------------

  const YearOptions = [
    { value: "2000", label: "2000" },
    { value: "2001", label: "2001" },
    { value: "2002", label: "2002" },
    { value: "2003", label: "2003" },
    { value: "2004", label: "2004" },
    { value: "2005", label: "2005" },
    { value: "2006", label: "2006" },
    { value: "2007", label: "2007" },
    { value: "2008", label: "2008" },
    { value: "2009", label: "2009" },
    { value: "2010", label: "2010" },
  ];

  const handleYearChange = (newValue) => {
    setYear(newValue.value);
    console.log(newValue);
  };
  // ------------------------------------------------

  const sortOptions = [
    { value: "popularity.asc", label: "Popularity" },
    { value: "release_date.asc", label: "Release Date" },
    { value: "revenue.asc", label: "Budget" },
    { value: "vote_average.asc", label: "Rating" },
    { value: "original_title.asc", label: "Title" },
  ];

  const handleSortChange = (newValue) => {
    setSort(newValue.value);
    console.log(newValue);
  };
  // --------------------------------------------------------------

  const [discover, setDiscover] = useState([]);

  const handleDiscover = () => {

    const discover = async () => {
      try {
          const data = await apiCalls.discover({
            language: "en-US",
            include_adult: false,
            with_genres: genre,
            sort_by: sort,
            page: 1,
            year: year
          });
          setDiscover(data.results);
          // setIsLoading(false);
          setTotal(data.total_results);
      } catch (error) {
          setError(error.message);
      }

    }
    discover();
    // fetch(SORT_BY_ALL)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw Error("Serverda ma'lumot olishda xatolik!!");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setDiscover(data.results);

    //     setTotal(data.total_results);
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //   });
  };


  return (
    <>
    {error ? (
      <p className="error-message">{error}</p>
    ) :
    <div className="container">
      <div className="big-filter-wrapper">
        <form>
          <BigSearchTitle>Big Search</BigSearchTitle>

          <Label>Till Year</Label>
          <Select options={YearOptions} onChange={handleYearChange} />
          <Label> Genre </Label>
          <Select options={newGenreArr} isMulti onChange={handleGenreChange} />
          <Label> Sort by </Label>
          <Select options={sortOptions} onChange={handleSortChange} />
          <br />

          <hr />
          <InputGap>
            <SearchButton
              className="search-btn"
              type="button"
              onClick={handleDiscover}
            >
            
              Discover
            </SearchButton>
            <div>
              Found <span>{total}</span> Movies
            </div>
          </InputGap>
        </form>

        <SearchedMovies className="searched_movies">
          {discover.map((el) => (
            <Movie className="movies-wrapper" movieobj={el} key={el.id} />
          ))}
        </SearchedMovies>
      </div>
    </div>
}
    </>   
  );
};

export default BigFilter;
