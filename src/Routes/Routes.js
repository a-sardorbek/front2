
import React from 'react'
import {useSelector} from "react-redux"
import { admin_routes } from "./limitedRoutes";
//folders
import Staffs from "../Pages/staffs/Staffs";
import Job_City from "../Pages/job_city/Job_City";

//icons
import Staff_icon from '@mui/icons-material/PeopleAltOutlined';
import Profession_icon from '@mui/icons-material/Work';


let routes = [...admin_routes]

let super_admin_routes = [
    {
        id: 6,
        path: "hodimlar",
        name: "Hodimlar",
        image:Staff_icon,
        Element:Staffs
      },
      {
        id: 7,
        path: "kasblar_va_shaharlar",
        name: "Kasblar va Shaharlar",
        image:Profession_icon,
        Element:Job_City
      },
]


const Routes = () => {
  let {role} = useSelector(state=>state.users)
  let set = [...routes];
  if(role === "super_admin"){
    set  =  new Set([...set,...super_admin_routes])
  }
  
  return [...set]
}

export default Routes






