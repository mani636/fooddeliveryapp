import React from 'react';
import './MainContainer.css';
import { Home, About, Cart, Login, Menu, Review } from '../../Pages/index';

const MainContainer = () => {
  return (
    <div className='main'>
      <About />
      <Menu />
    </div>
  );
};

export default MainContainer;
