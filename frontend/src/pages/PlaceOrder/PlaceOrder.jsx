import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const PlaceOrder=() =>{
    const{getTotalCardAmount,token,food_list,cartItems,url}=useContext(StoreContext);
    const[data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })
    const onChangeHandler =(event)=>{
        const{name,value}=event.target;
        setData({...data,[name]:value})
    }

    const placeOrder =async (event)=>{
           event.preventDefault();
           let orderItems=[];
           food_list.map((item)=>{
                if(cartItems[item._id]>0){
                     let itemInfo =item;
                     itemInfo["quantity"]=cartItems[item._id];
                     orderItems.push(itemInfo)
                }
           })
          let orderData={
             address:data,
             items:orderItems,
             amount:  getTotalCardAmount()+2        
            }
           let response=await axios.post(url+"/api/order/place",orderData,{headers:{token},"Content-Type": "application/json"})
           if(response.data.success){
            const{session_url}=response.data;
            window.location.replace(session_url)
           }
           else{
            alert("Error")
           }
    }
    const navigate=useNavigate();
    
    useEffect(() => {
  if (!token ) {
    navigate('/card');
  }
  else if(getTotalCardAmount()===0)
  {
    navigate('/card')
  }
}, [token]);
 return (
    <form className='place-order' onSubmit={placeOrder}>
        <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className="multi-fields">
                <input required type="text" placeholder='First Name '  onChange={onChangeHandler} value={data.firstName} name='firstName' />
                <input required type="text" placeholder='Last Name' onChange={onChangeHandler} value={data.lastName} name='lastName'  />
            </div>
            <input required type="email" placeholder='Email Address' onChange={onChangeHandler} value={data.email} name='email'  />
            <input required type="text" placeholder='Street' onChange={onChangeHandler} value={data.street} name='street'  />
            <div className="multi-fields">
                <input required type="text" placeholder='City' onChange={onChangeHandler} value={data.city} name='city'  />
                <input required type="text" placeholder='State' onChange={onChangeHandler} value={data.state} name='state'  />
            </div>
            <div className="multi-fields">
                <input required type="text" placeholder='Zip code' onChange={onChangeHandler} value={data.zipcode} name='zipcode'  />
                <input required type="text" placeholder='County' onChange={onChangeHandler} value={data.country} name='country'  />
            </div>
            <input required type="text" placeholder='phone' onChange={onChangeHandler} value={data.phone} name='phone'  />
        </div>
        <div className="place-order-right">
        <div className="cart-total">
                     <h2>Cart Total</h2>
                     <div>
                         <div className="cart-total-details">
                             <p>subtotal</p>
                             <p>${getTotalCardAmount()}</p>
                         </div>
                         <hr/>
                         <div className="cart-total-details">
                             <p>Delivary fee</p>
                             <p>${getTotalCardAmount()==0?0:2}</p>
                         </div>
                         <hr/>
                         <div className="cart-total-details">
                             <p>total</p>
                             <p>${getTotalCardAmount()==0?0: getTotalCardAmount()+2}</p>
                         </div>
                        </div>
                     <button  type='submit'>PROCEED TO PAYMENY</button>
                   </div>
        </div>
    </form>
  )
}

export default PlaceOrder