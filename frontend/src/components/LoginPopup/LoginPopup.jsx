import React, { useContext, useEffect, useState } from 'react'
import './LogonPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {
  const {url,setToken}=useContext(StoreContext)
  const[currState,setCurrState]= useState("Sign Up");
  const[data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  const onchangeHandler=(event)=>{
   const{name,value}=event.target
   setData({...data,[name]:value})
    }

    const onLogin =async(event)=>{
        event.preventDefault();
        let newUrl=url;
        if(currState=="Login"){
            newUrl+="/api/user/login"
        }
        else{
          newUrl+="/api/user/register"
        }
       const response=await axios.post(newUrl,data);
       if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setShowLogin(false);
       }
       else{
        alert(response.data.message)
       }
    }
 useEffect(()=>{
console.log(data);

 },[data])
  return (
    <div className='login-Popup'>
        <form action="" className="login-popup-container" onSubmit={onLogin}>
           <div className="login-popup-title">
              <h2>{currState} </h2>
              <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}></img>
           </div>
           <div className="login-popup-inputs">
               {currState==="Login"?<></>:<input type="text" name='name' value={data.name} onChange={onchangeHandler} placeholder='Your Name' required></input>}
                
                <input type="email" name='email' value={data.email} onChange={onchangeHandler} placeholder='Your email' required></input>
                <input type="password" name='password' value={data.password} onChange={onchangeHandler} placeholder='Your password' required></input>
           </div>
           <button type='submit'> {currState==="Sign Up"?"Create account":"Login"}</button>
           <div className="login-popup-condition">
                <input type='checkbox' required></input>
                <p>By continuting, i agree to the terms of use & privacy policy</p>
           </div>
           {currState=="Login"?<p>Create a new account <span onClick={()=>setCurrState("Sign Up")}>click here </span></p>
           :<p>Already have an account <span onClick={()=>setCurrState("Login")}> Login heres</span></p>}
           
           
        </form>

    </div>
  )
}

export default LoginPopup