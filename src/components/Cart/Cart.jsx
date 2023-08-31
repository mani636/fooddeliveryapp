import './Cart.css';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { MdOutlineClear } from 'react-icons/md';
import { BsArrowLeft } from 'react-icons/bs';
import { motion } from 'framer-motion';
import orderImage from '../../assets/cake.jpg';

const Cart = () => {
  return (
    <div className='cart'>
      <div className='cart-header'>
        <motion.p className='cart-header-icon' whileTap={{ scale: 0.75 }}>
          <BsArrowLeft />
        </motion.p>
        <p>Cart</p>
        <motion.p className='cart-clear-btn' whileTap={{ scale: 0.75 }}>
          Clear
          <span>
            <MdOutlineClear />
          </span>
        </motion.p>
      </div>

      <div className='order-items-container'>
        <div className='order-items'>
          <div className='order-img'>
            <img src={orderImage} alt='order-image' />
          </div>

          <div className='order-details'>
            <div className='order-title'>
              <h1>ice cream</h1>
              <p>$20.00</p>
            </div>
            <div className='order-quantity'>
              <motion.p whileTap={{ scale: 0.75 }}>
                <BiMinus />
              </motion.p>
              <p className='order-count'>1</p>
              <motion.p whileTap={{ scale: 0.75 }}>
                <BiPlus />
              </motion.p>
            </div>
          </div>
        </div>

        <div className='order-items'>
          <div className='order-img'>
            <img src={orderImage} alt='order-image' />
          </div>

          <div className='order-details'>
            <div className='order-title'>
              <h1>ice cream</h1>
              <p>$20.00</p>
            </div>
            <div className='order-quantity'>
              <motion.p whileTap={{ scale: 0.75 }}>
                <BiMinus />
              </motion.p>
              <p className='order-count'>1</p>
              <motion.p whileTap={{ scale: 0.75 }}>
                <BiPlus />
              </motion.p>
            </div>
          </div>
        </div>

        <div className='order-items'>
          <div className='order-img'>
            <img src={orderImage} alt='order-image' />
          </div>

          <div className='order-details'>
            <div className='order-title'>
              <h1>ice cream</h1>
              <p>$20.00</p>
            </div>
            <div className='order-quantity'>
              <motion.p whileTap={{ scale: 0.75 }}>
                <BiMinus />
              </motion.p>
              <p className='order-count'>1</p>
              <motion.p whileTap={{ scale: 0.75 }}>
                <BiPlus />
              </motion.p>
            </div>
          </div>
        </div>

        <div className='order-items'>
          <div className='order-img'>
            <img src={orderImage} alt='order-image' />
          </div>

          <div className='order-details'>
            <div className='order-title'>
              <h1>ice cream</h1>
              <p>$20.00</p>
            </div>
            <div className='order-quantity'>
              <motion.p whileTap={{ scale: 0.75 }}>
                <BiMinus />
              </motion.p>
              <p className='order-count'>1</p>
              <motion.p whileTap={{ scale: 0.75 }}>
                <BiPlus />
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className='total-container'>
        <div className='sub-total'>
          <p>Sub Total</p>
          <p>$20.00</p>
        </div>

        <div className='delivery-fees'>
          <p>Delivery</p>
          <p>$5.00</p>
        </div>

        <div className='total-amount-container'>
          <div className='total'>
            <p>Total</p>
            <p>$30.00</p>
          </div>

          <button type='button'>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
