import React from "react";
import BigFilter from "../components/BigFilter";
import styled from "styled-components";



const BigSearchWrapper = styled.div`
  display:flex;
  justify-content:space-around;
`;

const SearchBottomLine = styled.div`
margin-top:50px;
`;

const Search = () => {
  return (
    <div className='container'>
          <div className="searchPage">
      <div>
        <BigFilter />
      </div>

     
      
      <SearchBottomLine className ='search-bottom-line'>
        <BigSearchWrapper className='big-search-wrapper'>
    
        </BigSearchWrapper>
      </SearchBottomLine>
    </div>
    </div>
  );
};

export default Search;
