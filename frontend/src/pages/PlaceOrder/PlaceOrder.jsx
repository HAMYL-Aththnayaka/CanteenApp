import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import api from '../../lib/axios';

const PlaceOrder = () => {
  const { getaTotalCartAmmount, token, food_list, cartItems } = useContext(StoreContext);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [orderType, setOrderType] = useState('delivery');

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    nearest_town: '',
    street: '',
    address: '',
    phone_number: ''
  });

  const navigate = useNavigate();
  const subtotal = getaTotalCartAmmount();
  const deliveryFee = orderType === 'delivery' ? 200 : 0;
  const total = subtotal + deliveryFee;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first.");
      navigate('/login');
      return;
    }

    if (subtotal === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const items = food_list
        .filter(item => cartItems[item._id] > 0)
        .map(item => ({
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id],
        }));

      const orderData = {
        userId: token,      
        items,
        amount: total,
        address: data,
        paymentMethod,
        orderType,
        payment: true // auto marking to as paid
      };

      const res = await api.post('/api/order/create-order', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        alert(res.data.message);
        navigate('/myorders');
      } else {
        alert("Something went wrong while placing order.");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order.");
    }
  };

  useEffect(() => {
    if (!token || subtotal === 0) {
      navigate('/cart');
    }
  }, [token, subtotal, navigate]);

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className='place-order-left'>
        <p className='title'>Order Information</p>

        <div className="payment-method">
          <p>Select Order Type:</p>
          <label>
            <input
              type="radio"
              name="orderType"
              value="delivery"
              checked={orderType === 'delivery'}
              onChange={(e) => setOrderType(e.target.value)}
            />
            Delivery
          </label>
          <label>
            <input
              type="radio"
              name="orderType"
              value="dinein"
              checked={orderType === 'dinein'}
              onChange={(e) => setOrderType(e.target.value)}
            />
            Dine-in
          </label>
        </div>

        {orderType === 'delivery' && (
          <>
            <div className="multi-fields">
              <input name='firstName' value={data.firstName} onChange={onChangeHandler} placeholder='First Name' required />
              <input name='lastName' value={data.lastName} onChange={onChangeHandler} placeholder='Last Name' required />
            </div>
            <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Email Address' required />
            <input name='nearest_town' value={data.nearest_town} onChange={onChangeHandler} placeholder='Nearest Town' required />
            <div className="multi-fields">
              <input name='street' value={data.street} onChange={onChangeHandler} placeholder='Street' required />
              <input name='address' value={data.address} onChange={onChangeHandler} placeholder='Address' required />
            </div>
            <input name='phone_number' value={data.phone_number} onChange={onChangeHandler} placeholder='Phone Number' required />
          </>
        )}

        <div className="payment-method">
          <p>Select Payment Method:</p>
          <label>
            <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={(e) => setPaymentMethod(e.target.value)} />
            Pay Online
          </label>
          <label>
            <input type="radio" name="payment" value="counter" checked={paymentMethod === 'counter'} onChange={(e) => setPaymentMethod(e.target.value)} />
            Pay at Counter
          </label>
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-summary">
            {orderType === 'delivery' && (
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>LKR {deliveryFee}.00</p>
              </div>
            )}
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>LKR {total}.00</b>
            </div>
          </div>
          <button type="submit">Place Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
