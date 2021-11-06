import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Poster = styled.div`
border-radius: 8px;
width: 150px;
height:200px;
background-color:linear-gradient( to center, #C5C5C5, #E8E8E8);
`;

const ActorImage = styled.img`
display:block;
object-fit:contain;
object-position:center;

`;
const PosterImg = styled.div`
box-shadow: 0 2px 8px rgb(0 0 0 /100%);
`;

const NoImage = styled.img`
border: 1px solid black;
width: 140px;
height: 200px;
object-fit: cover;
`;

const Card = styled.div`
box-shadow: 0 2px 8px rgb(0 0 0 /100%);
margin-right:10px;
margin-bottom:20px;
`;

const ActorCard = ({name,charName,imgLink}) => {
  return (
    <a className= 'actor-card-link' href= {`https://en.wikipedia.org/wiki/${name}`} target='_blank'>
    
     <Card>
        <PosterImg className= 'poster'>
       { imgLink ? <ActorImage  className="actors-img" src={IMAGE_URL + imgLink} width="140"  height="200"/> :
        <Poster>
          <NoImage src="../img/noimage.jpg" alt="no poster" />
        </Poster> }  
      </PosterImg>
      <div className="actor-info"> 
      <p className="actors-name">{name}</p>
      <p className="actors-character-name">{charName}</p>
      </div>
     </Card>
    </a>
  );
};

export default ActorCard;