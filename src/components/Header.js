import React from "react"; 
import { Link } from "react-router-dom";

import "../App.css";

const Header = () => {
  return (
    <div className="header">
      <div className="container header-container">
        <Link className="header-logo-link" to='/'>
         <img className="header-logo" src="img/main-logo.svg" alt="logo" />
        </Link>
        
        <nav >
          <ul className="navbar-list">
            <li className="navbar-item"><Link className="navbar-item-link" to='/catalog'>Фильмы</Link></li>
            <li className="navbar-item"><Link className="navbar-item-link" to='/catalog'>Сериалы</Link></li>
           </ul>
        </nav>
        <div>
        <Link to='/search'>
          <i className="fas fa-search"></i>
          </Link>  
        </div>
      </div>
    </div>
  );
};

export default Header;
