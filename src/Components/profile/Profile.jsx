import React from 'react'
import Avatar from "./avatar/Avatar"
import Swal from 'sweetalert2'
import {useSelector,useDispatch} from 'react-redux'
import { getAllAdmin, postAddAdmin } from '../../Redux/super_admin/user';
import { addAdmin } from "../../Helpers/profil-modal";
import add_user from "../../Assets/Global/add_user.png"
import { errorNotification, successNotification } from '../../Helpers/notification';
import { getDashboardInfo } from '../../Redux/both/dashboard';


const Profile = () => {
  const {firstName, lastName,role}  = useSelector(state=>state.users)
  const dispatch = useDispatch()

  const handleDispatch = (data)=>{
    dispatch(postAddAdmin(data)).unwrap().then(()=>{
      successNotification("bottomRight","Muvofaqqiyatli qo'shildi")
      dispatch(getDashboardInfo("dashboard"))
      return dispatch(getAllAdmin())
    }).catch((err)=>{
      errorNotification("bottomRight",err)
    })
  }
  
  return (
    <>
        <span className="mx-2">{firstName} {lastName}</span>
        <Avatar/>
       {
        role === "super_admin" ? <span onClick={()=>addAdmin({handleDispatch})}>
        <img 
          src = {add_user} 
          alt = "add user" 
          className = "img-fluid mx-3" 
          style = {{width:"30px",cursor:"pointer"}}
        />
        </span>:null
       }
    </>
  )
}

export default Profile