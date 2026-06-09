import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
export const StoreContext=createContext(null)

const StoreContextProvider=(props)=>{

      const[cartItems,setcardItems]=useState({});
      const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const[token,setToken]=useState("");
      const[food_list,setFoodList]=useState([]);
      
      const addToCard= async(itemId)=>{
        if(!cartItems[itemId]){
            setcardItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setcardItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
          await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
      }
     
      const removeFromCard=async(itemId)=>{
       setcardItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
          await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
      }
      const getTotalCardAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
          if(cartItems[item]>0){
            let itemInfo=food_list.find((product)=>product._id==item);
            totalAmount+=itemInfo.price* cartItems[item]
          }
        }
        return totalAmount;
      }
      const fetchFoodList=async()=>{
        const response=await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
      }

      const localCortData = async(token)=>{
         const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
         setcardItems(response.data.cartData);
      }
      useEffect(()=>{
        
         async function loadData() {
          await fetchFoodList();
           if(localStorage.getItem("token")){
             setToken(localStorage.getItem("token"));
             await localCortData(localStorage.getItem("token"))
            }
         }
         loadData();
      },[])

    const contextValue={
      food_list,
      cartItems,
      setcardItems,
      addToCard,
      removeFromCard,
      getTotalCardAmount,
      url,
      token,
      setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;