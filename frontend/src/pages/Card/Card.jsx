import React, { useContext } from 'react'
import './Card.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

function Card() {
  const{cartItems,food_list,removeFromCard,getTotalCardAmount,url}=useContext(StoreContext);
  const  navicate=useNavigate();
    return (

    <div className="cart">
        <div className="cart-items">
           <div className="cart-items-title">
               <p>Items</p>
               <p> Title</p>
               <p> Price</p>
               <p> Quantity</p>
               <p> Total</p>
               <p>Remove</p>
            </div>
            <br></br>
            <hr></hr>
             {
               food_list.map((item,index)=>{
                  if(cartItems[item._id]>0){
                     return(
                       <div>
                            <div className='cart-items-title cart-items-item'>
                               <img src={url+"/images/"+item.image}></img>
                               <p>{item.name}</p>
                               <p>${item.price}</p>
                               <p>{cartItems[item._id]}</p>
                               <p>${item.price*cartItems[item._id]}</p>
                               <p className='cross' onClick={()=>removeFromCard(item._id)}>X</p>
                            </div>
                            <hr></hr>
                        </div> 
                    )
                  }
                })
              }
        </div>      
             <div className="cart-bottom">
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
                     <button onClick={()=>navicate('/Order')}>PROCEED TO CHECKOUT</button>
                   </div>
                   <div className="cart-promocode">
                      <div>
                          <p>if you have aromo code Enter here</p>
                               <div className="cart-promocode-input">
                               <input type='text' placeholder='promo code'></input>
                                <button>button</button>
                        </div>
                   </div>
                </div>
        </div>
    </div>


  )
}

export default Card