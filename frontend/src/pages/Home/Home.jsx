import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExplorerMenu from '../../components/ExploreMenu/ExplorerMenu.jsx'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import AppDownlaod from '../../components/appDownload/AppDownload.jsx'
const Home = () => {
  const [ catagory , setCatagory] = useState("All");
  return (
    <div>   
        <Header />
       <ExplorerMenu catagory={catagory} setCatagory={setCatagory} />
      <FoodDisplay catagory={catagory} />
         <AppDownlaod />  
     </div>
  )
}

export default Home
 