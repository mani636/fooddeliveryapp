import React from 'react';
import './Header.css';
import Logo from '../../assets/logo.png';
import { links } from '../../constant/NavLink';
import { Link } from 'react-router-dom';
import profileImg from '../../assets/download.jpg';
import { CgShoppingCart } from 'react-icons/cg';

const Header = () => {
  return (
    <nav>
      <div className='logo'>
        <Link to='/'>
          <img src={Logo} alt='logo' />
        </Link>
      </div>

      <div className='nav-link-container'>
        <ul>
          {links.map(({ id, link, url }) => {
            return (
              <li key={id}>
                <Link to={url}>{link}</Link>
              </li>
            );
          })}
        </ul>

        <div className='icon'>
          <Link>
            <CgShoppingCart />
          </Link>
          <p className='product-quantity'>0</p>
        </div>

        <div className='profile-container'>
          <img src={profileImg} alt='profile' />
        </div>
      </div>
    </nav>
  );
};

export default Header;
