import React from "react";
import * as Yup from "yup";
import Cookie from "universal-cookie";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import Button from "@mui/material/Button";
import "./table.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputMask from "react-input-mask";
import Input from "@mui/material/Input";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIcon from "@mui/icons-material/Phone";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAvailableCities,
  getAllJobs,
} from "../../Redux/super_admin/cities_jobs";
import { editSingleInfo, getSingleInfo } from "../../Redux/both/infos";
import { Redirect, useParams } from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../../Helpers/notification";

function Edit() {
  const dispatch = useDispatch();
  const params = useParams();
  const jobs = useSelector((state) => state.cities_jobs.jobs.data);
  const cities = useSelector((state) => state.cities_jobs.availableCities.data);
  const client = useSelector((state) => state.infos.singleInfo.data);

  const cookie = new Cookie();

  React.useEffect(() => {
    let mounting = true;
    if (mounting) {
      dispatch(getSingleInfo(params.id));
      dispatch(getAllAvailableCities());
      dispatch(getAllJobs());
    }
    return () => {
      mounting = false;
    };
  }, []);

  let initialValues = {
    clientId: client?.id ?? "",
    professionId: client?.responsibleProfession?.id ?? "",
    addressId: client?.address?.id ?? "",
    firstName: client?.firstName ?? "",
    lastName: client?.lastName ?? "",
    phoneNumber: client?.phoneNumber ?? "",
    houseNum: client?.houseNum ?? "",
    flatNum: client?.flatNum ?? "",
    problem: client?.problem ?? "",
    status: client?.status ?? "",
  };

  const handleSubmit = (data, { resetForm }) => {
    if (data.phoneNumber !== initialValues.phoneNumber) {
      let numberPattern = /\d+/g;
      data.phoneNumber = data.phoneNumber
        .match(numberPattern)
        .join("")
        .slice(0);
    }
    dispatch(editSingleInfo(data))
      .unwrap()
      .then(() => {
        successNotification("bottomRight", "Muvofaqqiyatli o'zgardi");
        dispatch(getSingleInfo(params.id));
      })
      .catch((err) => {
        errorNotification("bottomRight", err);
      });
    resetForm({});
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form className="wrapperForm">
              <Box
                component="div"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                  color: "white",
                }}
                autoComplete="off"
                className="wrapperInputs"
              >
                <TextField
                  id="outlined-basic"
                  label="Ism"
                  variant="standard"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  name="firstName"
                  className="inputs"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ marginRight: "5px" }}
                      >
                        <PersonAddIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Familiya"
                  variant="standard"
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  className="inputs"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ marginRight: "5px" }}
                      >
                        <PersonAddIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <InputMask
                  mask="(99) 999-99-99"
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                >
                  {(inputProps) => (
                    <FormControl
                      sx={{ m: 1, width: "30ch" }}
                      variant="standard"
                      className="phoneNumber inputs"
                    >
                      <Input
                        autoComplete="off"
                        id="standard-adornment-login"
                        type={"text"}
                        name="phoneNumber"
                        startAdornment={
                          <InputAdornment
                            position="start"
                            sx={{ marginRight: "5px" }}
                          >
                            <span style={{ color: "black" }}>+998</span>
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment
                            position="end"
                            sx={{ marginRight: "5px" }}
                          >
                            <PhoneIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  )}
                </InputMask>
                <div className="inputs">
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Mas'ul hodim
                    </InputLabel>
                    <Select
                      defaultValue=""
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Age"
                      value={formik.values.professionId}
                      onChange={formik.handleChange}
                      name="professionId"
                    >
                      {jobs.map((job) => {
                        return (
                          <MenuItem key={job.id} value={job.id}>
                            {job.nameProfession}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="inputs">
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Yashash manzili
                    </InputLabel>
                    <Select
                      defaultValue=""
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Age"
                      value={formik.values.addressId}
                      onChange={formik.handleChange}
                      name="addressId"
                    >
                      {cities.map((city) => {
                        return (
                          <MenuItem key={city.id} value={city.id}>
                            {city.addressName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="dom-kvartira">
                  <div className="dom">
                    <TextField
                      id="outlined-basic"
                      label="Dom"
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
                            <PersonAddIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="kvartira">
                    <TextField
                      id="outlined-basic"
                      label="Kvartira"
                      variant="standard"
                      type="text"
                      value={formik.values.flatNum}
                      onChange={formik.handleChange}
                      name="flatNum"
                      className="inputs"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            sx={{ marginRight: "5px" }}
                          >
                            <PersonAddIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  value={formik.values.problem}
                  onChange={formik.handleChange}
                  name="problem"
                  placeholder="Muommoni kiriting"
                  style={{ width: 200 }}
                  className="inputs textArea"
                />
                <Button
                  disabled={formik.isSubmitting || !formik.isValid}
                  variant="contained"
                  type="submit"
                >
                  Malumotlarni saqlash
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
export default Edit;

let validationSchema = Yup.object({
  professionId: Yup.number().required("*biriktirilagan kasb turini kiriting"),
  addressId: Yup.number().required("*shahar nomini kiriting"),
  firstName: Yup.string().required("*ismini kiriting"),
  lastName: Yup.string().required("*familyasini kiriting"),
  phoneNumber: Yup.string().required("*telefon nomerini kiriting"),
  houseNum: Yup.string().required("*toliq adresini kiriting"),
  flatNum: Yup.string().required("*toliq adresini kiriting"),
  problem: Yup.string().required("*muammosini kiriting"),
});
