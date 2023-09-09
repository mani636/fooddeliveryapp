import { useState } from 'react';
import NavLinks from './component/NavLinks';
import './Header.css';
import Logo from '../../assets/logo.png';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import Avatar from '../../assets/download.jpg';

import { CgShoppingCart } from 'react-icons/cg';
import { MdAdd, MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';

import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';

const Header = () => {
  const [{ user, cartItems, cartShow }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const clickHandler = () => {
    setIsMenu(!isMenu);
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <nav>
      <div className='logo'>
        <Link to='home' smooth duration={500}>
          <img src={Logo} alt='logo' />
        </Link>
      </div>

      <div className='nav-link-container'>
        <NavLinks />
        <div className='icon' onClick={showCart}>
          <NavLink>
            <CgShoppingCart />
          </NavLink>
          {cartItems && cartItems.length > 0 && (
            <p className='product-quantity'>{cartItems.length}</p>
          )}
        </div>

        <div className='profile-container'>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user && Avatar}
            alt='user-profile'
            onClick={clickHandler}
            className='profile-img'
          />
        </div>

        {isMenu && (
          <div className='user-drop-menu'>
            <NavLink to='/profile'>
              <p>
                Profile
                <MdAdd />
              </p>
            </NavLink>
            <p onClick={logout} className='logout'>
              Logout
              <MdLogout />
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
