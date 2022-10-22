import React from "react";
import { useSelector } from "react-redux";
import FilterTable from "../../Components/table/FilterTable";
import Table from "../../Components/table/table";
const ReceivedInfos = () => {
  const { firstName, lastName } = useSelector((state) => state.users);
  return (
    <>
      <div className="text-muted d-flex" style={{ marginBottom: "15px" }}>
        <p className="mx-2" style={{ fontWeight: "bold" }}>
          {firstName} {lastName}
        </p>
        <span> tamonidan kiritilgan malumotlar</span>
      </div>
      <FilterTable />
      <Table singleUser={true} />
    </>
  );
};

export default ReceivedInfos;
