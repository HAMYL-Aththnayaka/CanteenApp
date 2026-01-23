import React, { useState, useEffect, useContext } from 'react';
import './Myorders.css';
import api from '../../lib/axios.js';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const Myorders = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(StoreContext);

  const fetchOrder = async () => {
    try {
      const response = await api.post(
        '/api/order/userorders',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data.data || []); 
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length == 0 ? (
        <div>
         <p>No orders found.</p>
          <img src={assets.parcel_icon}/>
          </div>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />

              <p>
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} × {item.quantity}
                    {i !== order.items.length - 1 && ', '}
                  </span>
                ))}
              </p>

              <p>LKR {order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span
                  className={
                    order.status === 'Delivered'
                      ? 'status delivered'
                      : 'status pending'
                  }
                >
                  &#x25cf;
                </span>{' '}
                <b>{order.status}</b>
              </p>
              <button onClick={()=>fetchOrder()}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Myorders;
