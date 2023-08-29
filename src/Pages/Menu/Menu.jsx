import './Menu.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useStateValue } from '../../context/StateProvider';

const Menu = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  return (
    <div className='menu'>
      <h1>
        Our <span>Menu</span>
      </h1>
      <div className='menu-box'>
        {foodItems &&
          foodItems.map(({ id, desc, title, price, imageURL }) => (
            <div className='menu-card' key={id}>
              <div className='menu-image'>
                <img src={imageURL} alt={title} />
              </div>

              <div className='menu-info'>
                <h2>{title}</h2>
                <p>{desc}</p>
                <h3>${price}.00</h3>
                <div className='menu-icon'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>

                <div className='menu-btn'>
                  <button type='button'>Order Now</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
