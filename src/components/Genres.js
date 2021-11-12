import React from "react";
import { MY_API_KEY } from "../global";
import { useEffect, useState } from "react";
import {NavLink } from "react-router-dom";
import { useParams } from "react-router";
import styled from "styled-components";

const API_PARAMS = `?api_key=${MY_API_KEY}&language=en-US`;
const GENRES = `https://api.themoviedb.org/3/genre/movie/list${API_PARAMS}`;

const GenresSidebar = styled.div`
  width: 180px;
  margin-bottom: 5px;
  margin-right:20px;
`;

const GenresLinkInner = styled.div`
display: block;
padding: 8px;
background-color: #032541;
background-color: linear-gradient(0deg, rgba(4,147,148,1) 37%, rgba(28,29,148,1) 97%);
text-align: center;
font-weight: 700;
font-size: 20px;
text-decoration: none;
border-radius: 5px;
color:white;
&:hover {
  
    color:#1DD4AC;
 
}
`;

const Genres = () => {
  const [error, setError] = useState();
  const [genres, setGenres] = useState([]);

  const { id } = useParams({});

  useEffect(() => {
    fetch(GENRES)
      .then((res) => {
        if (!res.ok) {
          throw Error("Serverda ma'lumot olishda xatolik!!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setGenres(data.genres);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div  className='fixingBox'>
      {genres.map((el) => (
        <GenresSidebar className="genres-sidebar" key={el.id}>
          <NavLink activeClassName="genres-link" to={`/catalog/${el.id}`}  style={{textDecoration:'none'}}>
            {/* TODO: ishlamadi */}
            <GenresLinkInner className="genres-link-inner">
              {el.name}
            </GenresLinkInner>
          </NavLink>
        </GenresSidebar>
      ))}
    </div>
  );
};

export default Genres;
