import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Card from './pages/Card/Card'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrder from './pages/MyOrders/MyOrder'

const App = () => {
 
  const[showLogin,setShowLogin]=useState(false);
 
  return (
    <>
    {
      showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>
    }
     <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/Card' element={<Card/>}></Route>
        <Route path='/Order' element={<PlaceOrder/>}></Route>
        <Route path='/verify' element={<Verify/>} ></Route>
        <Route path='/myorders' element={<MyOrder/>} ></Route>

      </Routes>
    </div>
    <Footer/></>
   
  )
}

export default App