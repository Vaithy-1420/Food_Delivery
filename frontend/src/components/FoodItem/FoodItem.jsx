import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {
    // const[itemCount,setItemCount]=useState(0);
    const{cartItems,addToCard,removeFromCard,url}=useContext(StoreContext)
    // console.log("id",id);
  return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className='food-item-image' src={url+"/images/"+image}></img>
            {
                !cartItems[id]
                 ?<img src={assets.add_icon_white} onClick={()=>addToCard(id)} className='add'></img>
                 :<div className='food-item-counter'>
                      <img onClick={()=>removeFromCard(id)} src={assets.remove_icon_red}></img>
                      <p>{cartItems[id]}</p>
                      <img onClick={()=>addToCard(id)} src={assets.add_icon_green}></img>
                 </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts}></img>
            </div>
            <p className="food-item-description">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
       
    </div>
  )
}

export default FoodItem