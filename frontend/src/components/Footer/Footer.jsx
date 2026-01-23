import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id ='footer'>
        <div className='footer-content'>
            <div className="footer-content-left">
                <img src={assets.logo} alt='' className='logo-footer'/>
                <p> UniBites</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon}  alt=''/>
                    <img src={assets.linkedin_icon} alt='' />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About-Us</li>
                    <li>Delivery</li>
                    <li>Privacy-Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get IN Touch</h2>
                <ul>
                    <li>+94701160679</li>
                    <li>Contact@uniBites.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyrigh 2024  © uniBites.com - All Right Reserved
        </p>
    </div>
  )
}

export default Footer
