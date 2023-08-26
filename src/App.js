import { Fragment } from 'react';
import Header from './components/Header/Header';
import { Home, About, Cart, Login, Menu, Review } from './Pages';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <main className='main-container'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/review' element={<Review />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </main>
  );
};

export default App;
