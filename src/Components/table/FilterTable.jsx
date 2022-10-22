import React, { useState } from "react";
import "./table.css";
import { Form, Formik, ErrorMessage } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { getAllAvailableCities } from "../../Redux/super_admin/cities_jobs";
import { errorNotification } from "../../Helpers/notification";
import { filteredInfo, getInfos } from "../../Redux/both/infos";

const FilterTable = ({ setClear }) => {
  const dispatch = useDispatch();
  const [filterActive, setFilterActive] = useState(false);

  let initialValues = {
    regionId: "",
    houseNum: "",
    flatNum: "",
    name: "",
  };

  React.useEffect(() => {
    let mounting = true;
    if (mounting) {
      dispatch(getAllAvailableCities());
    }
    return () => {
      mounting = false;
    };
  }, []);

  const handleClear = () => {
    dispatch(filteredInfo(initialValues))
      .unwrap()
      .then(() => {})
      .catch((err) => {
        errorNotification("bottomRight", err);
      });
  };

  const handleSubmit = (data, { resetForm }) => {
    setFilterActive(true);
    dispatch(filteredInfo(data))
      .unwrap()
      .then(() => {})
      .catch((err) => {
        errorNotification("bottomRight", err);
      });
    resetForm({});
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          console.log("formik", formik.values);
          return (
            <Form className="wrapper-filter">
              <Box
                component="div"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                  color: "white",
                }}
                autoComplete="off"
                className="filter"
              >
                <TextField
                  id="outlined-basic"
                  label="Dom raqami"
                  variant="standard"
                  type="text"
                  value={formik.values.houseNum}
                  onChange={formik.handleChange}
                  name="houseNum"
                  className="inputs"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ marginRight: "5px" }}
                      >
                        <FilterListIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Kvartira raqami"
                  variant="standard"
                  type="text"
                  name="flatNum"
                  value={formik.values.flatNum}
                  onChange={formik.handleChange}
                  className="inputs"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ marginRight: "5px" }}
                      >
                        <FilterListIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Ism orqali qidirish"
                  variant="standard"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="inputs"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ marginRight: "5px" }}
                      >
                        <FilterListIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  disabled={
                    formik.values.name ||
                    formik.values.houseNum ||
                    formik.values.flatNum
                      ? false
                      : true
                  }
                  variant="contained"
                  type="submit"
                  sx={{ padding: "5px 20px" }}
                >
                  Qidirish
                </Button>
                <Button
                  disabled={filterActive ? false : true}
                  variant="contained"
                  type="button"
                  onClick={() => {
                    handleClear();
                    setClear(true);
                    setFilterActive(false);
                  }}
                  sx={{ padding: "5px 25px" }}
                >
                  Tozalash
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FilterTable;
