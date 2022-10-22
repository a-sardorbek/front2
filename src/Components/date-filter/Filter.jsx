import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { DateRangePicker } from "rsuite";
import { format } from 'date-fns'
import "rsuite/dist/rsuite.min.css";
import { getDashboardInfo } from '../../Redux/both/dashboard';
import "./Filter.css"
import { errorNotification } from '../../Helpers/notification';

const Filter = () => {
  const [dateValues, setDateValues] = useState([new Date(), new Date()]);
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);
  const [color3, setColor3] = useState(false);
  
  const dispatch = useDispatch()
  
 const handleColorChange = (e) => {
    if (e.target.innerText === "Kun") {
      setColor1(true);
      setColor2(false);
      setColor3(false);
      dispatch(getDashboardInfo("dashboard/?day=true")).unwrap().then(()=>{
      }).catch((err)=>{
          errorNotification("bottomRight",err)
      })
    } else if (e.target.innerText === "Hafta") {
      setColor1(false);
      setColor2(true);
      setColor3(false);
      dispatch(getDashboardInfo("dashboard/?week=true")).unwrap().then(()=>{
      }).catch((err)=>{
          errorNotification("bottomRight",err)
      })
    } else if (e.target.innerText === "Oy") {
      setColor1(false);
      setColor2(false);
      setColor3(true);
      dispatch(getDashboardInfo("dashboard/?month=true")).unwrap().then(()=>{
      }).catch((err)=>{
          errorNotification("bottomRight",err)
      })
    }
  };

  const sendRangeData = () => {
    if(dateValues){
      dispatch(getDashboardInfo(`dashboard/?start_date=${format(dateValues[0], 'yyyy-MM-dd')}&&end_date=${format(dateValues[1], 'yyyy-MM-dd')}`))
    }
  };

  return (
    <>
         <div className={"firstDateContent"}>
           <p
             onClick={handleColorChange}
             className={color1 ? "active_option" : ""}
           >
             Kun
           </p>
           <p
             onClick={handleColorChange}
             className={color2 ? "active_option" : ""}
           >
             Hafta
           </p>
           <p
             onClick={handleColorChange}
             className={color3 ? "active_option" : ""}
           >
             Oy
           </p>
         </div>
         <div className={"secondDateContent" + " mx-3"}>
           <DateRangePicker
             onExit={sendRangeData}
             value={dateValues || []}
             onChange={setDateValues}
             placeholder="sana | oy | yil"
             className={"dateRangePicker"}
           />
         </div>
    </>
  )
}

export default Filter