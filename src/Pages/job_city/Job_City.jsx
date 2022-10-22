import React from "react";
import "./job_city.css";
import Jobs from "../../Components/Jobs_cities/jobs/Jobs";
import Cities from "../../Components/Jobs_cities/Cities.jsx/Cities";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Job_City = () => {
  return (
    <div>
      <h2>Shaharlar va mas'ul hodimlar qo'shish</h2>
      <div className="wrapper-job_city">
        <div className="job_city">
          <div className="cities">
            <Cities />
          </div>
          <div className="jobs">
            <Jobs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job_City;
