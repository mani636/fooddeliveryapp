import './Gallery.css';
import { useStateValue } from '../../context/StateProvider';
import { useEffect, useState } from 'react';
import { actionType } from '../../context/reducer';

// notification
import { toast } from 'react-toastify';

const Gallery = () => {
  const [{ foodItems, cartItems }, dispatch] = useStateValue();
  const [data, setData] = useState(foodItems);
  const [items, setItems] = useState([]);

  const clickOrder = (item) => {
    setItems([...cartItems, item]);

    toast.success('Successfully Add To Cart', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });

    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  useEffect(() => {
    setData(
      foodItems && foodItems.filter((item) => item.category === 'gallery')
    );
  }, [foodItems]);

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div className='gallery' name='Gallery'>
      <h1>
        Our <span>Gallery</span>
      </h1>
      <div className='gallery-image-box'>
        {data &&
          data.map((item) => {
            return (
              <div className='gallery-img' key={item.id}>
                <img src={item.imageURL} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <button type='button' onClick={() => clickOrder(item)}>
                  Order Now
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;
