import { useState } from 'react';
import './Header.css';
import Logo from '../../assets/logo.png';
import { links } from '../../constant/NavLink';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/download.jpg';

import { CgShoppingCart } from 'react-icons/cg';
import { MdAdd, MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion';

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase.config';
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

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(auth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
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
        <Link>
          <img src={Logo} alt='logo' />
        </Link>
      </div>

      <div className='nav-link-container'>
        <ul>
          {links.map(({ id, link }) => {
            return <li key={id}>{link}</li>;
          })}
        </ul>

        <div className='icon' onClick={showCart}>
          <Link>
            <CgShoppingCart />
          </Link>
          {cartItems && cartItems.length > 0 && (
            <p className='product-quantity'>{cartItems.length}</p>
          )}
        </div>

        <div className='profile-container'>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt='user-profile'
            onClick={login}
            className='profile-img'
          />
        </div>

        {isMenu && (
          <div className='user-drop-menu'>
            {user && user.email === 'manikandanraj817@gmail.com' && (
              <Link to='/createItem'>
                <p>
                  New Item
                  <MdAdd />
                </p>
              </Link>
            )}
            <p onClick={logout}>
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
