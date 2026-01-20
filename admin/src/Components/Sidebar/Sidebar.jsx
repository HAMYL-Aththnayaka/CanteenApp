import React from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">

        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='/List' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        
        <NavLink to='/help' className="sidebar-option">
          <img className='imgg' src={assets.service} alt="" />
          <p>AddToHelpingHand </p>
        </NavLink>
        
        <NavLink to='/Orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>

        {/*<NavLink to='/contact' className="sidebar-option">
          <img className='imgg' src={assets.admin} alt="" />
          <p>contactAdmin </p>
        </NavLink>
          */}

        <NavLink to='/listhelp' className="sidebar-option">
          <img className='imgg' src={assets.HHFood} alt="" />
          <p>ListHelpingHand </p>
        </NavLink>

        {/*<NavLink to='/helpUsers' className="sidebar-option">
          <img className='imgg' src={assets.HHUser} alt="" />
          <p>List HH users </p>
        </NavLink>
        */}
      </div>
    </div>
  )
}

export default Sidebar
