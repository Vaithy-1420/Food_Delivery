import React, { useContext, useState, useMemo } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [menu, setmenu] = useState("menu");
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { getTotalCardAmount, token, setToken, food_list, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  const handleSearchClose = () => {
    setShowSearch(false);
    setSearchQuery("");
  }

  const handleResultClick = (category) => {
    handleSearchClose();
    navigate("/");
    setTimeout(() => {
      const exploreSection = document.getElementById("explore-menu");
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: "smooth" });
      }
      window.dispatchEvent(new CustomEvent("selectCategory", { detail: category }));
    }, 100);
  }

  const filteredFoods = useMemo(() => {
    if (searchQuery.trim().length === 0) return [];
    return food_list.filter(food =>
      food.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [searchQuery, food_list]);

  return (
    <div className='navbar'>

      <Link to='/'>
        <img src={assets.logo} alt='' className='logo' />
      </Link>

      {!showSearch ? (
        <ul className="navbar-menu">
          <Link to='/' onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
          <a href='#explore-menu' onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
          <a href='#app-download' onClick={() => setmenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
          <a href='#footer' onClick={() => setmenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
        </ul>
      ) : (
        <div className="search-wrapper">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <span className="close-search" onClick={handleSearchClose}>x</span>
          </div>

          {searchQuery.trim().length > 0 && (
            <div className="search-results">
              {filteredFoods.length > 0 ? (
                filteredFoods.map((food) => (
                  <div key={food._id} className="search-result-item" onClick={() => handleResultClick(food.category)}>
                    <img src={`${url}/images/${food.image}`} alt={food.name} />
                    <div className="search-result-info">
                      <p className="search-result-name">{food.name}</p>
                      <p className="search-result-category">{food.category}</p>
                    </div>
                    <p className="search-result-price">₹{food.price}</p>
                  </div>
                ))
              ) : (
                <div className="search-no-result">
                  <p>No food found for "<span>{searchQuery}</span>"</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="navbar-right">

        {!showSearch && (
          <div className='search' onClick={() => setShowSearch(true)}>
            <img src={assets.search_icon} alt='' />
          </div>
        )}

        <div className="navbar-search-icon">
          <Link to='/card'>
            <img src={assets.basket_icon} alt='' />
          </Link>
          <div className={getTotalCardAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt='' />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt='' />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}

        {/* Hamburger — navbar-right உள்ளே, gap இல்ல */}
        <div className="hamburger-wrap">
          {!showMobileMenu ? (
            <div className="hamburger" onClick={() => setShowMobileMenu(true)}>
              <div className='mob-menu'></div>
              <div className='mob-menu'></div>
              <div className='mob-menu'></div>
            </div>
          ) : (
            <div className="close-menu" onClick={() => setShowMobileMenu(false)}>✕</div>
          )}
        </div>

      </div>

      {showMobileMenu && (
        <div className="mobile-menu">
          <Link to="/">Home</Link>
          <a href="#explore-menu">Menu</a>
          <a href="#app-download">Mobile App</a>
          <a href="#footer">Contact Us</a>
        </div>
      )}

    </div>
  )
}

export default Navbar