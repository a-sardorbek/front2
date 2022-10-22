import React from "react";
import Table from "../../Components/table/table";
import FilterTable from "../../Components/table/FilterTable";
const Infos = () => {
  const [clear, setClear] = React.useState(false);
  console.log("clear", clear);
  return (
    <>
      <div className="text-muted d-flex" style={{ marginBottom: "15px" }}>
        <p className="mx-2" style={{ fontWeight: "bold" }}>
          Xodimlar
        </p>
        <span> tamonidan kiritilgan malumotlar</span>
      </div>
      <FilterTable setClear={setClear} />
      <Table multipleUser={true} clear={clear} />
    </>
  );
};

export default Infos;
