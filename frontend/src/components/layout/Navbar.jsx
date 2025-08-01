import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ icon="fas fa-pizza-slice", title="Foodbase" }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/favorites'>Favorites</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;