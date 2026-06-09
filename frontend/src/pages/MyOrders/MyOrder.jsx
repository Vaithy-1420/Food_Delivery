import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from '../../context/StoreContext'
import './MyOrder.css'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrder = () => {
    const{url,token}=useContext(StoreContext)
    const [data,setData]=useState([]);
    const fetchOrders = async ()=>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data)
      
        
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    } ,[token])
      return (
    <div className='my-orders'>
        <h2>MyOrder</h2>
        <div className="container">
            {
                data.map((order,index)=>(
                   <div className='my-orders-order' key={index}>
                        <img src={assets.parcel_icon} alt='nbv'></img>
                        <p>{order.items.map((item,index)=>{
                               if(index===order.items.length-1){
                                return item.name + " X "+ item.quantity;
                               }
                               else{
                                  return item.name+ " X  "+ item.quantity+" ,"
  
                               }
                        })}</p>
                        <p>${order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Tract Order</button>
                   </div>
                ))
            }
        </div>
      
    </div>
  )
}

export default MyOrder
