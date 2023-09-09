import React from 'react';
import './MainContainer.css';
import Home from '../Home/Home';
import About from '../About/About';
import Menu from '../Menu/Menu';
import Gallery from '../Gallery/Gallery';
import Review from '../Review/Review';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import { useStateValue } from '../../context/StateProvider';

// react toastify notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainContainer = () => {
  const [{ cartShow }] = useStateValue();
  return (
    <div className='main'>
      <Home />
      <About />
      <Menu />
      <Gallery />
      <Review />
      <Footer />
      {cartShow && <Cart />}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </div>
  );
};

export default MainContainer;
