import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ catagory }) => {
  const { food_list } = useContext(StoreContext); 
  if (!food_list || food_list.length === 0) {
    return <p>Loading food items...</p>; 
  }

  const filteredFoods = food_list.filter(
    item => 
catagory === "All" || item.catagory === catagory  );

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You ..</h2>
      <div className="food-display-list">
        {filteredFoods.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            canteen={item.canteen}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
