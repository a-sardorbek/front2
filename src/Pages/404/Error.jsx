import React, { useEffect,useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import routes from "../../Routes/Routes";
import "./Error.css";

const Error = () => {
  let [nested,setNested]  = useState(false)

  let location = useLocation()
  let relevent_routes = [...routes().map(route =>route.path)]

  useEffect(()=>{
   if(location.pathname.startsWith("/tizimli/") && !relevent_routes.includes(location.pathname.slice(9))){
    setNested(true)
   }
  },[location])


  return (
    <div className={nested ? "error-wrapper context-wrapper":"error-wrapper"}>
      <div className={"error-inner"}>
        <h2 className={nested ? "error-title text-muted":"error-title"}>Sahifa topilmadi.</h2>
        <p className={nested ?"error-text text-muted":"error-text"}>
          Kechirasiz siz qidirayotgan sahifa mavjud emas.Siz quyidagi tugmani
          bosib bosh sahifaga qaytishingiz mumkin.
        </p>
        <Link to = "/"  className={"error-btn no_hover"}>Bosh sahifa</Link>
      </div>
    </div>
  );
};

export default Error;
