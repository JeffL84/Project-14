import React from 'react';
import headervector from '../images/Vector.png';
import { Link } from 'react-router-dom';


function Header(props) {

  return (
    <header className="header section-width">

      <img className="header__vector" src={headervector} alt="Around Vector" />
      <div className= "header__content">
        <p>{props.email}</p>
        <Link className = "header__link" to = {props.link}>{props.navText}</Link>
      </div>

    </header>

  );

}

export default Header;

