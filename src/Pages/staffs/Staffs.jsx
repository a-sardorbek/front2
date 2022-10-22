import React, { useEffect } from 'react'
import Card from "../../Components/staff-card/Card"
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAdmin } from '../../Redux/super_admin/user'
import { errorNotification } from '../../Helpers/notification'

const Staffs = () => {
  const data  = useSelector(state=>state.super_admin_user.adminDatas.data)
  const dispatch = useDispatch()

  useEffect(()=>{
     let mounting = true
     if(mounting){
      dispatch(getAllAdmin()).unwrap().then(()=>{}).catch((err)=>{errorNotification("bottomRight",err)})
     }
     return ()=>{
       mounting = false
     }
   },[])
  return (
    <div  style = {{flexWrap:"wrap"}} className='w-100 d-flex'>
        {data.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.2,
                  delay: 0.05 * index,
                  ease: [0.1, 0.01, -0.01, 0.1],
                }}
                className="tableRow"
              >
                <div className = "mt-2 mx-1"><Card key={index} user={row} /></div>
              </motion.div>
        ))}
       
    </div>
  )
}

export default Staffs