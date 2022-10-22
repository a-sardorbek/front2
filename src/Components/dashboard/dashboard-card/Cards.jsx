import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@mui/icons-material/Message";
import "./Cards.css";
import { formatNumber } from "../../../Utils/formatNumber";
import { getDashboardInfo } from "../../../Redux/both/dashboard";
import { errorNotification } from "../../../Helpers/notification";

const Cards = () => {
  let dispatch = useDispatch();
  let { clientCount, clientFixedCount, clientUnfixedCount, adminCount } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    let mounting = true;
    if (mounting) {
      dispatch(getDashboardInfo("dashboard"))
        .unwrap()
        .then(() => {})
        .catch((err) => {
          errorNotification("bottomRight", err);
        });
    }
    return () => {
      mounting = false;
    };
  }, []);
  return (
    <div className={"mt-4"}>
      <div className={"cardss"}>
        <div className={"cards secondary-color"}>
          <Icon />
          <div className={"cardRightElement"}>
            <span>Umumiy arizalar soni</span>
            <h4 style={{ color: "gray" }}>{formatNumber(clientCount)}</h4>
          </div>
        </div>
        <div className={"cards secondary-color"}>
          <Icon />
          <div className={"cardRightElement"}>
            <span>Yakunlangan ishlar soni</span>
            <h4 style={{ color: "#99CF63" }}>
              {formatNumber(clientFixedCount)}
            </h4>
          </div>
        </div>
        <div className={"cards secondary-color"}>
          <Icon />
          <div className={"cardRightElement"}>
            <span style={{ fontSize: "15px" }}>Yakunlanmagan ishlar soni</span>
            <h5 style={{ color: "#F0B750" }}>
              {formatNumber(clientUnfixedCount)}
            </h5>
          </div>
        </div>
        <div className={"cards secondary-color"}>
          <Icon />
          <div className={"cardRightElement"}>
            <span>Hodimlar soni</span>
            <h4 style={{ color: "#DC6470" }}>{formatNumber(adminCount)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
