import React from 'react'
import {useSelector} from "react-redux"
import "./Main.css"
import Content from '../../Components/content/Content';
import { Redirect } from 'react-router-dom';


const Main = () => {
  let {role}  = useSelector(state=>state.users)
  
  return (
    <>
      {
          !(role === "admin" || role === "super_admin") ? 
           <Redirect exact = {true} from = "*" to = "/login"/>:<Content/>
      }
    </>
  )
}

export default Main

