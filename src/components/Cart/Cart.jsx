import './Cart.css';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { MdOutlineClear } from 'react-icons/md';
import { BsArrowLeft } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';

const Cart = () => {
  const [{ cartShow, cartItems }, dispatch] = useStateValue();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className='cart'
    >
      <div className='cart-header'>
        <motion.p
          className='cart-header-icon'
          whileTap={{ scale: 0.75 }}
          onClick={showCart}
        >
          <BsArrowLeft />
        </motion.p>
        <p>Cart</p>
        <motion.p
          className='cart-clear-btn'
          whileTap={{ scale: 0.75 }}
          onClick={clearCart}
        >
          Clear
          <span>
            <MdOutlineClear />
          </span>
        </motion.p>
      </div>

      <div className='order-items-container'>
        {cartItems &&
          cartItems.map((item) => (
            <div className='order-items' key={item.id}>
              <div className='order-img'>
                <img src={item.imageURL} alt={item.title} />
              </div>

              <div className='order-details'>
                <div className='order-title'>
                  <h1>{item.title}</h1>
                  <p>${item.price}.00</p>
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
          ))}
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
    </motion.div>
  );
};

export default Cart;
