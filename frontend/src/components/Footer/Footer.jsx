import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
         <div className="footer-content-left">
            <img src={assets.logo}></img>
            <p>hose fron a deverse menu featuring a delectable array of dishes crafted with the finest ingredients and culi. Ouv missionis to satidy your cravings and alevate your dining experiences, one delicious meals at the time</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon}></img>
                <img src={assets.twitter_icon}></img>
                <img src={assets.linkedin_icon}></img>
            </div>
         </div>
         <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
                <li>Home</li>
                <li>About us</li>
                <li> Delivery</li>
                <li>Privacy policy</li>

              </ul>
        </div>
         <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+234-5670-678</li>
                <li>vaitheesawripavi3007@gmail.com</li>
            </ul>
         </div>
    </div>
    <hr/>
    <p className='footer-copyright'> Copyright 2024 -Allrights reversed</p>
    </div>
  )
}

export default Footer