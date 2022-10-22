import React from "react";
import Cards from "../../Components/dashboard/dashboard-card/Cards";
import Bar from "../../Components/dashboard/dashboard-graph/Bar";
import Graph from "../../Components/dashboard/dashboard-graph/Graph";
import Circle from "../../Components/dashboard/dashboard-circle/Circle";

const Dashboard = () => {
  return (
    <>
      <Cards />
      <Circle />
      <div>
        <Graph />
      </div>
      <div>
        <Bar />
      </div>
    </>
  );
};

export default Dashboard;
