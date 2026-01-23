import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, helping_food_list, removeFromCart, getaTotalCartAmmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const allItems = [...food_list, ...helping_food_list];

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {allItems.map(item => {
          const cartItem = cartItems[item._id];
          if (cartItem?.quantity > 0) {
            const price = cartItem.isHelpingHand ? 0 : item.price;
            return (
              <div key={item._id} className="cart-items-item">
                <img src={`http://localhost:3000/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>LKR {price}.00</p>
                <p>{cartItem.quantity}</p>
                <p>LKR {price * cartItem.quantity}.00</p>
                <p className="cross" onClick={() => removeFromCart(item._id)}>x</p>
                <hr />
              </div>
            )
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>LKR {getaTotalCartAmmount()}.00</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>LKR {getaTotalCartAmmount() === 0 ? 0 : 200}.00</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b> LKR {getaTotalCartAmmount() === 0 ? 0 : getaTotalCartAmmount() + 200}.00</b>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;
