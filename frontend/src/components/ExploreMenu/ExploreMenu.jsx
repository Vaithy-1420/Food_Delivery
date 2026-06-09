import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu=({ category,setCategory}) =>{
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore ou menu</h1>
        <p className='explore-menu-test'>Chose fron a deverse menu featuring a delectable array of dishes crafted with the finest ingredients and culi. Ouv missionis to satidy your cravings and alevate your dining experiences, one delicious meals at the time</p>
        <div className="explore-menu-list">
            {
                menu_list.map((item,index)=>{
                    return(
                        <div onClick={()=>{
                           setCategory(prev=> prev==item.menu_name?"All":item.menu_name)
                        }}
                         key={index} className="explore-menu-list-item">
                            <img className={category==item.menu_name?"active":""} src={item.menu_image}></img>
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
        <hr></hr>
    </div>
  )
}

export default ExploreMenu