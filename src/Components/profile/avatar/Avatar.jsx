import * as React from 'react';
import {message} from "antd"
import Swal from "sweetalert2"
import {useDispatch,useSelector} from "react-redux";
import { logoutUser,editProfiles,editPasswords } from '../../../Redux/both/user';
import Cookies from "universal-cookie"
import { Redirect } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import User from '@mui/icons-material/PersonOutlineRounded';
import EditUser from '@mui/icons-material/Edit';
import Phone from '@mui/icons-material/Phone';
import Leave from '@mui/icons-material/ExitToApp';
import { errorNotification, successNotification } from '../../../Helpers/notification';
import Collapse from '@mui/material/Collapse';
import Lock from '@mui/icons-material/Lock';

import user from "../../../Assets/Global/avatarr.png";
import { editProfile,editPassword } from '../../../Helpers/profil-modal';

export default function TransitionsTooltips() {

  const [open, setOpen] = React.useState(true);
  const [logged,setLogged] = React.useState(true)

  const {firstName,lastName,phoneNumber,role} = useSelector(state=>state.users)
  const cookies  = new Cookies()  
  const  id = cookies.get("id")

  const dispatch = useDispatch()

  const handleClick = () => {
    setOpen(!open);
  };

  
  if(!logged){
    dispatch(logoutUser())
    cookies.remove("role")
    cookies.remove("id")
    cookies.remove("token")
  } 

  const handleDispatch = (data)=>{
    dispatch(editProfiles(data)).unwrap().then(()=>{
      successNotification("bottomRight","Muvofaqqiyatli ozgardi")
    }).catch((err)=>{
      errorNotification("bottomRight",err)
    })
  }
  
  const handlePassword = (data)=>{
    console.log(data)
    dispatch(editPasswords(data)).unwrap().then(()=>{
      successNotification("bottomRight","Muvofaqqiyatli ozgardi")
      dispatch(logoutUser())
    }).catch((err)=>{
      errorNotification("bottomRight",err)
    })
  }


  return (
    <div>

     {
          !(role === "admin" || role === "super_admin") ? 
           <Redirect exact = {true} from = "*" to = "/login"/>:null
      }

      
      <Tooltip  TransitionComponent={Zoom}  title={<List
         className='primary-color p-0 m-0'
         subheader={
         <ListSubheader 
          onClick = {()=>handleClick()}
          component="div" 
          sx={{background:"#d1d2de",cursor:"pointer"}} 
          id="nested-list-subheader">
          O'zgaritirsh <EditUser/> 

        <Collapse in={open} timeout="auto" unmountOnExit >
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} 
          onClick = {()=>editProfile({firstName,lastName,phoneNumber,id,handleDispatch})} 
          >
            <ListItemIcon>
              <User />
            </ListItemIcon>
            <ListItemText primary="Shaxsiy profil" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}
           onClick = {()=>editPassword({handlePassword})}
          >
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Maxfiy kalit" />
          </ListItemButton>
        </List>
      </Collapse>

         </ListSubheader>
         }
       >
           <ListItemButton>
             <ListItemIcon>
               <User className='text-white'/>
             </ListItemIcon>
             <ListItemText primary={`${firstName} ${lastName}`} className='text-white' />
           </ListItemButton>
           <ListItemButton>
             <ListItemIcon>
               <Phone className='text-white'/>
             </ListItemIcon>
             <ListItemText primary={`+998 ${phoneNumber}`} className='text-white' />
           </ListItemButton>
           <ListItemButton onClick={()=>setLogged(false)}>
             <ListItemIcon>
               <Leave className='text-danger' />
             </ListItemIcon>
             <ListItemText primary="Chiqish" className='text-danger' />
           </ListItemButton>
           </List>}>
          <img src={user} alt="user" className={"user"} />
        </Tooltip>

        </div>
    );
}


