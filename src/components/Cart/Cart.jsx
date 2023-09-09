import './Cart.css';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { MdOutlineClear } from 'react-icons/md';
import { BsArrowLeft } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import cartEmpty from '../../assets/empty-cart.webp';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Cart = () => {
  const [{ cartShow, cartItems, subTotal }, dispatch] = useStateValue();

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
    toast.success('Successfully Clear Cart');
  };

  const checkOut = () => {
    dispatch({
      type: actionType.SET_CHECKOUT,
      cartItems: [],
      cartShow: !cartShow,
    });

    toast.success('order has been placed');
  };

  const increaseItem = (id) => {
    dispatch({
      type: actionType.SET_INCREASE_ITEM,
      payload: { id: id },
    });
  };

  const decreaseItem = (id) => {
    dispatch({
      type: actionType.SET_DECREASE_ITEM,
      payload: { id: id },
    });
    toast.success('Successfully removed from Cart');
  };

  useEffect(() => {
    dispatch({
      type: actionType.SET_UPDATE_TOTAL,
    });
  }, [cartItems]);

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

      {cartItems && cartItems.length > 0 ? (
        <div className='order'>
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
                      <motion.p
                        whileTap={{ scale: 0.75 }}
                        onClick={() => decreaseItem(item.id)}
                      >
                        <BiMinus />
                      </motion.p>
                      <p className='order-count'>{item.quantity}</p>
                      <motion.p
                        whileTap={{ scale: 0.75 }}
                        onClick={() => increaseItem(item.id)}
                      >
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
              <p>${subTotal}</p>
            </div>

            <div className='delivery-fees'>
              <p>Delivery</p>
              <p>$5.00</p>
            </div>

            <div className='total-amount-container'>
              <div className='total'>
                <p>Total</p>
                <p>${5 + subTotal}</p>
              </div>

              <button type='button' onClick={checkOut}>
                Check Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='cart-empty'>
          <img src={cartEmpty} alt='cart-empty' />
          <p>Add some items to your cart</p>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
