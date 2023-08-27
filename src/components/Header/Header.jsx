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
  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

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
            <p>
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
