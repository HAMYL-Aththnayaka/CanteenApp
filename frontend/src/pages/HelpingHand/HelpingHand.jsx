import React, { useContext } from 'react';
import FoodItem from '../../components/FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';
import './HelpingHand.css';
import { useNavigate } from 'react-router-dom';

const HelpingHandDisplay = ({ category = 'All' }) => {
  const { helping_food_list = [] } = useContext(StoreContext);
  const navigate = useNavigate();

  console.log(helping_food_list);

  const filteredFoods = helping_food_list.filter(
    (item) => category === "All" || item.category === category
  );

  return (
    <div>
      <div className="food-display1" id="helping-hand-display">
        <h2>Helping Hand - Foods Paid by Others</h2>
        <div className="food-display-list1">
          {filteredFoods.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              canteen={item.canteen}
              price={0} 
              image={item.image}
              isHelpingHand={true} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpingHandDisplay;
