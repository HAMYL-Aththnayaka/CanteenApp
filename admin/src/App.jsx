import React from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import Navbar from './Components/Navbar/Navbar'
import {Routes , Route} from 'react-router-dom'
import Add from './Pages/Add/Add'
import ContactAdmin from './Pages/ContactAdmin/ContactAdmin'
import AddToHelpingHand from './Pages/AddToHelpingHand/AddToHelpingHand'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import ListHelpng from './Pages/ListHelpingHand/ListHelpng'
import ListHelpuser from './Pages/ListHelpuser/ListHelpuser'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      
      <div className="app-content">
        <Sidebar/>
        <Routes >
          <Route path='/add' element={<Add />}/>
          <Route path='/contact' element={<ContactAdmin />}/>
          <Route path='/helpUsers' element={<ListHelpuser />}/>
          <Route path='/help' element={<AddToHelpingHand />}/>
          <Route path='/listhelp' element={<ListHelpng />}/>
          <Route path='/list' element={<List />}/>
          <Route path='/orders' element={<Orders />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
