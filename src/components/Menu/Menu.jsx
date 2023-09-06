import './Menu.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useStateValue } from '../../context/StateProvider';
import { useEffect, useState } from 'react';
import { actionType } from '../../context/reducer';
import { ToastContainer, toast } from 'react-toastify';

const Menu = () => {
  const [{ foodItems, cartItems, isLogin }, dispatch] = useStateValue();

  const [items, setItems] = useState([]);
  const [data, setData] = useState(foodItems);

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });

    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  useEffect(() => {
    setData(
      foodItems && foodItems.filter((item) => item.category !== 'gallery')
    );

    localStorage.setItem('isLogin', JSON.stringify(isLogin));
  }, [foodItems]);

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div className='menu' name='Menu'>
      <h1>
        Our <span>Menu</span>
      </h1>
      <div className='menu-box'>
        {data &&
          data.map((item) => (
            <div className='menu-card' key={item.id}>
              <div className='menu-image'>
                <img src={item.imageURL} alt={item.title} />
              </div>

              <div className='menu-info'>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
                <h3>${item.price}.00</h3>
                <div className='menu-icon'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>

                <div className='menu-btn'>
                  <button
                    type='button'
                    onClick={() => setItems([...cartItems, item])}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
