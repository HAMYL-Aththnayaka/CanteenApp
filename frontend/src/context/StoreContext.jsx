import { createContext, useEffect, useState } from "react";
import api from '../lib/axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const [food_list, setFood_list] = useState([]);
  const [helping_food_list, setHelping_food_list] = useState([]);

  // Add item to cart
  const addToCart = async (itemId, isHelpingHand = false) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }));

    if (token) {
      try {
        await api.post(
          '/api/cart/add',
          { itemId, isHelpingHand },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Failed to add to cart:", err);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    if (token) {
      try {
        await api.post(
          '/api/cart/remove',
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Failed to remove from cart:", err);
      }
    }
  };

  // Get total cart amount
  const getaTotalCartAmmount = () => {
    let totalAmmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find(p => p._id === itemId)
          || helping_food_list.find(p => p._id === itemId);

        if (itemInfo) {
          const price = itemInfo.isHelpingHand ? 0 : itemInfo.price;
          totalAmmount += price * cartItems[itemId];
        }
      }
    }
    return totalAmmount;
  };

  // Fetch food lists
  const fetchFoodList = async (userToken = '') => {
    try {
      const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {};

      const [normalRes, helpingRes] = await Promise.all([
        api.get('/api/foods/list'),
        api.get('/api/HelpingHand/foods/listfront', { headers }),
      ]);

      setFood_list(normalRes.data?.Data || []);   setHelping_food_list(
        (helpingRes.data?.Data || []).map(item => ({
          ...item,
          isHelpingHand: true
        }))
      );
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  // Load cart from backend
  const loadCartData = async (userToken) => {
    try {
      const res = await api.post(
        '/api/cart/get',
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setCartItems(res.data.cartData || {});
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
        await fetchFoodList(storedToken);
      } else {
        await fetchFoodList();
      }
    }
    loadData();
  }, []);

  // Provide all context values
  return (
    <StoreContext.Provider value={{
      food_list,
      helping_food_list,
      cartItems,
      addToCart,
      removeFromCart,
      getaTotalCartAmmount,
      token,
      setToken,
      setCartItems
    }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
