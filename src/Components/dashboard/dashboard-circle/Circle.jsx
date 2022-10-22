import React, { useEffect, useState } from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "./animation/AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";
import "./Circle.css";
import { useSelector } from "react-redux";

const SecondChart = () => {
  let { clientCount, clientFixedCount, clientUnfixedCount, adminCount } =
    useSelector((state) => state.dashboard);
  const [countfirst, setCountfirst] = useState(0);
  const [countsecond, setCountsecond] = useState(0);
  const [countthird, setCountthird] = useState(0);
  const [countfourth, setCountfourth] = useState(0);
  let firstcount = 0;
  let secondcount = 0;
  let thirdcount = 0;
  let fourthcount = 0;
  let second = 1;

  function CalculateclientCount(n) {
    while (true) {
      if (n >= firstcount * 100 && n < second * 100) {
        return firstcount;
      } else {
        firstcount++;
        second++;
      }
      setCountfirst(firstcount);
    }
  }
  function CalculateclientFixedCount(n) {
    while (true) {
      if (n >= secondcount * 100 && n < second * 100) {
        return secondcount;
      } else {
        secondcount++;
        second++;
      }
      setCountsecond(secondcount);
    }
  }
  function CalculateclientUnfixedCount(n) {
    while (true) {
      if (n >= thirdcount * 100 && n < second * 100) {
        return thirdcount;
      } else {
        thirdcount++;
        second++;
      }
      setCountthird(thirdcount);
    }
  }
  function CalculateadminCount(n) {
    while (true) {
      if (n >= fourthcount * 100 && n < second * 100) {
        return fourthcount;
      } else {
        fourthcount++;
        second++;
      }
      setCountfourth(fourthcount);
    }
  }

  useEffect(() => {
    CalculateadminCount(adminCount);
    CalculateclientFixedCount(clientFixedCount);
    CalculateclientUnfixedCount(clientUnfixedCount);
    CalculateclientCount(clientCount);
  }, [clientCount, clientFixedCount, clientUnfixedCount, adminCount]);

  return (
    <div className={"wrapperq" + " mt-3"}>
      <div className={"rightSideWrapper"}>
        <div className={"headerRight"}>
          <h4>Arizalar Paneli</h4>
        </div>
        <div className={"progressBarContent"}>
          <div style={{ width: "170px" }}>
            <AnimatedProgressProvider
              valueStart={0}
              valueEnd={clientCount}
              duration={1.4}
              easingFunction={easeQuadInOut}
              repeat={false}
            >
              {(value) => {
                return (
                  <CircularProgressbarWithChildren
                    value={value}
                    styles={buildStyles({
                      pathTransition: "none",
                      pathColor: "#3399FF",
                      trailColor: "gray",
                      strokeLinecap: "butt",
                      textColor: "white",
                      textSize: "15px",
                    })}
                    strokeWidth={5}
                  >
                    <div
                      style={{
                        fontSize: 17,
                        color: "#3399FF",
                        fontWeight: "bold",
                      }}
                      className="arizalar"
                    >
                      Umumiy arizalar
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                      }}
                      className="arizalar_soni"
                    >
                      {clientCount - countfirst * 100}
                    </div>
                  </CircularProgressbarWithChildren>
                );
              }}
            </AnimatedProgressProvider>
            {countfirst === 0 ? (
              ""
            ) : (
              <div
                className="Circle_hundred"
                style={{
                  color: `${
                    countfirst < 2 ? "green" : countfirst < 5 ? "blue" : "red"
                  }`,
                }}
              >
                <span>{countfirst * 100}</span>
              </div>
            )}
          </div>

          <div style={{ width: "170px" }}>
            <AnimatedProgressProvider
              valueStart={0}
              valueEnd={clientFixedCount}
              duration={1.4}
              easingFunction={easeQuadInOut}
              repeat={false}
            >
              {(value) => {
                return (
                  <CircularProgressbarWithChildren
                    value={value}
                    styles={buildStyles({
                      pathTransition: "none",
                      pathColor: "#98CC63",
                      trailColor: "gray",
                      strokeLinecap: "butt",
                      textColor: "white",
                      textSize: "15px",
                    })}
                    strokeWidth={5}
                  >
                    <div
                      style={{
                        fontSize: 17,
                        color: "#98CC63",
                        fontWeight: "bold",
                      }}
                      className="arizalar"
                    >
                      Yakunlangan
                    </div>
                    <div style={{ fontSize: 22 }} className="arizalar_soni">
                      {clientFixedCount - countsecond * 100}
                    </div>
                  </CircularProgressbarWithChildren>
                );
              }}
            </AnimatedProgressProvider>
            {countsecond === 0 ? (
              ""
            ) : (
              <div
                className="Circle_hundred"
                style={{
                  color: `${
                    countsecond < 2 ? "green" : countsecond < 5 ? "blue" : "red"
                  }`,
                }}
              >
                <span>{countsecond * 100}</span>
              </div>
            )}
          </div>

          <div style={{ width: "170px" }}>
            <AnimatedProgressProvider
              valueStart={0}
              valueEnd={clientUnfixedCount}
              duration={1.4}
              easingFunction={easeQuadInOut}
              repeat={false}
            >
              {(value) => {
                return (
                  <CircularProgressbarWithChildren
                    value={value}
                    styles={buildStyles({
                      pathTransition: "none",
                      pathColor: "#F0b750",
                      trailColor: "gray",
                      strokeLinecap: "butt",
                      textColor: "white",
                      textSize: "15px",
                    })}
                    strokeWidth={5}
                  >
                    <div
                      style={{
                        fontSize: 17,
                        color: "#F0b750",
                        fontWeight: "bold",
                      }}
                      className="arizalar"
                    >
                      Yakunlanmagan
                    </div>
                    <div style={{ fontSize: 22 }} className="arizalar_soni">
                      {clientUnfixedCount - countthird * 100}
                    </div>
                  </CircularProgressbarWithChildren>
                );
              }}
            </AnimatedProgressProvider>
            {countthird === 0 ? (
              ""
            ) : (
              <div
                className="Circle_hundred"
                style={{
                  color: `${
                    countthird < 2 ? "green" : countthird < 5 ? "blue" : "red"
                  }`,
                }}
              >
                <span>{countthird * 100}</span>
              </div>
            )}
          </div>

          <div style={{ width: "170px" }}>
            <AnimatedProgressProvider
              valueStart={0}
              valueEnd={adminCount}
              duration={1.4}
              easingFunction={easeQuadInOut}
              repeat={false}
            >
              {(value) => {
                return (
                  <CircularProgressbarWithChildren
                    value={value}
                    styles={buildStyles({
                      pathTransition: "none",
                      pathColor: "#FF6C75",
                      trailColor: "gray",
                      strokeLinecap: "butt",
                      textColor: "white",
                      textSize: "15px",
                    })}
                    strokeWidth={5}
                  >
                    <div
                      style={{
                        fontSize: 17,
                        color: "#FF6C75",
                        fontWeight: "bold",
                      }}
                      className="arizalar"
                    >
                      Hodimlar
                    </div>
                    <div style={{ fontSize: 22 }} className="arizalar_soni">
                      {adminCount - countfourth * 100}
                    </div>
                  </CircularProgressbarWithChildren>
                );
              }}
            </AnimatedProgressProvider>
            {countfourth === 0 ? (
              ""
            ) : (
              <div
                className="Circle_hundred"
                style={{
                  color: `${
                    countfourth < 2 ? "green" : countfourth < 5 ? "blue" : "red"
                  }`,
                }}
              >
                <span>{countfourth * 100}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondChart;
