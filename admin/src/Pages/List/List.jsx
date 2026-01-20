import React ,{useEffect,useState} from 'react'
import './List.css'
import api from '../../lib/axios'
import {toast} from 'react-toastify'

const List = () => {   
  const url = "http://localhost:3000";
  const [list , setList ] = useState([]);
  const [selectedCanteen, setSelectedCanteen] = useState("Applied-Canteen");

  const fetchList = async()=>{
    const response = await api.get('/foods/list')
    
    if (response.data.success){
      setList(response.data.Data || [])
      toast.success("Food Fetched Successfull")
    }else{
      toast.error("Error IN Fetching Food")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  
  const removeFood = async (foodId) => {
    try {
      const response = await api.delete('/foods/remove', { data: { id: foodId } });
      if (response.data.success) {
        setList(prevList => prevList.filter(item => item._id !== foodId));
        toast.success("Item Removed!!");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className='list add flex-col'>
      <div className="option">
        <p>Select Which Canteen</p>
        <select 
          name="canteen" 
          value={selectedCanteen} 
          onChange={(e)=>setSelectedCanteen(e.target.value)}
        >
          <option value="Applied-Canteen">Applied-Canteen</option>
          <option value="Bs-Canteen">Bs-Canteen</option>
          <option value="Ammachi-Canteen">Ammachi-Canteen</option>
          <option value="Boys-Hostel-Canteen">Boys-Hostel-Canteen</option>
        </select>
      </div>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Catagory</b>
          <b>Price</b> 
          <b>Action</b>
        </div> 
        {list
          .filter(item => item.canteen === selectedCanteen)
          .map((item,index)=>(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.catagory}</p>
              <p>LKR {item.price}</p>
              <p onClick={()=>{removeFood(item._id)}} className='cursor'>X</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default List
