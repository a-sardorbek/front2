import React, { useEffect, useState } from "react";
import "./jobs.css";
import TagsInput from "./TagsInput";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfessions,
  getAllCities,
  getAllJobs,
} from "../../../Redux/super_admin/cities_jobs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { deleteJob } from "../../../Redux/super_admin/infosDelete";
import {
  errorNotification,
  successNotification,
} from "../../../Helpers/notification";
import { editCities } from "../../../Redux/both/user";

const Jobs = () => {
  const cities = useSelector((state) => state.cities_jobs.cities.data);
  const jobs = useSelector((state) => state.cities_jobs.jobs.data);
  const dispatch = useDispatch();

  let arr = [];

  function handleSelecetedTags(items) {
    items.forEach((element) => {
      const newObj = { nameProfession: element };
      arr.push(newObj);
    });
  }

  const handleProfessions = () => {
    dispatch(editProfessions(arr))
      .unwrap()
      .then(() => {
        dispatch(getAllJobs());
        window.location.reload();
      })
      .catch((err) => {
        errorNotification("bottomRight", err);
      });
  };

  const DeleteCity = (id) => {
    const deletedCity = [];
    const city = cities.find((city) => city.id === id);
    deletedCity.push({
      id: city.id,
      addressName: city.addressName,
      status: false,
    });

    dispatch(editCities(deletedCity))
      .unwrap()
      .then(() => {
        successNotification("bottomRight", "Muvofaqqiyatli o'chirildi");
        dispatch(getAllCities());
      })
      .catch((err) => {
        errorNotification("bottomRight", err);
      });
  };

  // function findClickedCity(id) {
  //   dispatch(editCities(city))
  //     .unwrap()
  //     .then(() => {
  //       successNotification("bottomRight", "Muaffaqqiyatli o'chirildi");
  //       dispatch(getAllCities());
  //     })
  //     .catch((err) => {
  //       errorNotification("bottomRight", err);
  //     });
  // }

  useEffect(() => {
    let mounting = true;
    if (mounting) {
      dispatch(getAllCities());
    }
    return () => {
      mounting = false;
    };
  }, []);

  useEffect(() => {
    let mounting = true;
    if (mounting) {
      dispatch(getAllJobs());
    }
    return () => {
      mounting = false;
    };
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteJob(id))
      .unwrap()
      .then(() => {
        dispatch(getAllJobs());
        successNotification("bottomRight", "Muvofaqqiyatli o'chirildi");
      })
      .catch((err) => {
        errorNotification("bottomRight", err);
      });
  };

  return (
    <div className="wrapper_jobs_cities">
      <div className="wrapper_jobs">
        <TagsInput
          selectedTags={handleSelecetedTags}
          fullWidth
          variant="outlined"
          id="tags"
          name="tags"
          placeholder="mas'ul hodimlar qo'shish"
        />
        <div className="wrapper-chips">
          {jobs.map((job) => {
            return (
              <div className="chip">
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={job.nameProfession}
                    onDelete={() => handleDelete(job.id)}
                  />
                </Stack>
              </div>
            );
          })}
        </div>

        <div className="cities-job_button">
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => handleProfessions()}>
              Masul hodimlar qoshish
            </Button>
          </Stack>
        </div>

        <div className="line"></div>
      </div>

      <div className="wrapper-inside_jobs">
        {cities
          .filter((city) => city.status === true)
          .map((city) => {
            return (
              <div className="cities_box">
                <Box
                  component="span"
                  sx={{
                    p: 2,
                    border: "1px dashed grey",
                    position: "relative",
                    px: 4,
                  }}
                >
                  <div
                    className="closeIcon"
                    onClick={() => DeleteCity(city.id)}
                  >
                    <CloseRoundedIcon />
                  </div>
                  <Button>{city.addressName}</Button>
                </Box>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Jobs;
