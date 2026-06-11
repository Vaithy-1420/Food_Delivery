import React from 'react'
import './Header.css';
import ExploreMenu from "../ExploreMenu/ExploreMenu";

function Header() {


  const handleViewMenu = () => {
    const exploreSection = document.getElementById("explore-menu");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className='header'>
        <div className="header-contents">
          <h2>Order your favourite food here</h2>
          <p className='header-para'>Chose fron a deverse menu featuring a delectable array of dishes crafted with the finest ingredients and culi. Ouv missionis to satidy your cravings and alevate your dining experiences, one delicious meals at the time</p>
          <button onClick={handleViewMenu}>View menu</button>
        </div>
      </div>

      
      
    </>
  )
}

export default Header