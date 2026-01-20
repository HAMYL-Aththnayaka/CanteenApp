import React, { useEffect, useState } from 'react';
import './AddToHelpingHand.css';
import api from '../../lib/axios'
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const Add = () => { 
 
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    catagory: 'Salad',
    canteen: 'Applied-Canteen'
  });

  const onChangeHandler = (e) => {
    const { name, value, files } = e.target;
    if (files) setImage(files[0]);
    else setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler =async (event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('name',data.name);
    formData.append('description',data.description);
    formData.append('price',Number(data.price=0));
    formData.append('catagory',data.catagory);
    formData.append('canteen',data.canteen);
    formData.append('image',image);

    const response = await api.post('/HelpingHand/foods/add',formData)

    if(response.data.success){
          setData({
                      name: '',
                      description: '',
                      price: '',
                      catagory: '',
                      canteen: 'Applied-Canteen'
          })
          setImage(false)
          toast.success(" Food Added Successfuly !!!", {
  style: {
    background: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  },
  progressStyle: {
    background: "lime",
  },
});

    }else{
      toast.error("Something Went Wrong Food Was Not Adedd !!!")
    }
    
  }

  return (
    <div className="add">
      <form className="form" onSubmit={onSubmitHandler} >

       
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload area"
            />
          </label>
          <input type="file" id="image" onChange={onChangeHandler} hidden required />
        </div>

       
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Type Here..."
            required
          />
        </div>

       
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            value={data.description}
            onChange={onChangeHandler}
            placeholder="Write Content Here .."
            required
          />
        </div>

        
        <div className="add-catagory-price">
          <div className="add-catagory flex-col">
            <p>Product Category</p>
            <select name="catagory" value={data.catagory} onChange={onChangeHandler}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Dessert">Dessert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure-Veg">Pure-Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="LKR 100.00"
              required
            />
          </div>
        </div>


        <div className="Canteen-select flex-col">
          <p>Please Select Which Canteen</p>
          <select name="canteen" value={data.canteen} onChange={onChangeHandler}>
            <option value="Applied-Canteen">Applied-Canteen</option>
            <option value="Bs-Canteen">Bs-Canteen</option>
            <option value="Ammachi-Canteen">Ammachi-Canteen</option>
            <option value="Boys-Hostel-Canteen">Boys-Hostel-Canteen</option>
          </select>
        </div>

      
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
