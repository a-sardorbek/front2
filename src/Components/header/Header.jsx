import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Profile from "../profile/Profile";
import Filter from "../date-filter/Filter";
import "./Header.css";

let datas = [
  "/tizimli/malumotlar",
  "/tizimli/malumotlar/",
  "/tizimli",
  "/tizimli/",
  "/tizimli/qabul_qilinganlar",
  "/tizimli/qabul_qilinganlar/",
  "/tizimli/bajarilganlar",
  "/tizimli/bajarilganlar/",
];

const Header = () => {
  const { role } = useSelector((state) => state.users);
  const [filterable, setFilterable] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (role && datas.includes(location.pathname)) {
      setFilterable(true);
    } else {
      setFilterable(false);
    }
  }, [location]);

  return (
    <div className={"WrappingWholeContent_Header"}>
      <div className={"dateContent"}>{filterable ? <Filter /> : null}</div>
      <div className={"userContent"}>
        <Profile />
      </div>
    </div>
  );
};

export default Header;
