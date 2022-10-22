import React from "react";
import * as Yup from "yup";
import Cookie from "universal-cookie";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Form, Formik, ErrorMessage } from "formik";
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
import { getInfos, postInfo } from "../../Redux/both/infos";
import {
  errorNotification,
  successNotification,
} from "../../Helpers/notification";

function InputFields() {
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.cities_jobs.jobs.data);
  const cities = useSelector((state) => state.cities_jobs.availableCities.data);
  const cookie = new Cookie();

  React.useEffect(() => {
    let mounting = true;
    if (mounting) {
      dispatch(getAllAvailableCities());
      dispatch(getAllJobs());
    }
    return () => {
      mounting = false;
    };
  }, []);

  let initialValues = {
    systemUserId: cookie.get("id"),
    firstName: "",
    lastName: "",
    professionId: "",
    addressId: "",
    phoneNumber: "",
    houseNum: "",
    flatNum: "",
    problem: "",
  };

  const handleSubmit = (data, { resetForm }) => {
    let numberPattern = /\d+/g;
    data.phoneNumber = data.phoneNumber.match(numberPattern).join("").slice(3);
    console.log("data", data);
    dispatch(postInfo(data))
      .unwrap()
      .then(() => {
        successNotification("bottomRight", "Muvofaqqiyatli qo'shildi");
        return dispatch(getInfos(20));
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
                <ErrorMessage name="firstName">
                  {(msg) => (
                    <>
                      <div style={{ color: "red", display: "block" }}>
                        {msg}
                      </div>
                    </>
                  )}
                </ErrorMessage>
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

                <ErrorMessage name="lastName">
                  {(msg) => (
                    <>
                      <div style={{ color: "red", display: "block" }}>
                        {msg}
                      </div>
                    </>
                  )}
                </ErrorMessage>

                <InputMask
                  mask="+\9\98 (99) 999-99-99"
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
                      <InputLabel htmlFor="standard-adornment-login">
                        Telefon raqami
                      </InputLabel>
                      <Input
                        autoComplete="off"
                        id="standard-adornment-login"
                        type={"text"}
                        name="phoneNumber"
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
                <ErrorMessage name="phoneNumber">
                  {(msg) => (
                    <>
                      <div style={{ color: "red", display: "block" }}>
                        {msg}
                      </div>
                    </>
                  )}
                </ErrorMessage>

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
                <ErrorMessage name="professionId">
                  {(msg) => (
                    <>
                      <div style={{ color: "red", display: "block" }}>
                        {msg}
                      </div>
                    </>
                  )}
                </ErrorMessage>

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
                <ErrorMessage name="addressId">
                  {(msg) => (
                    <>
                      <div style={{ color: "red", display: "block" }}>
                        {msg}
                      </div>
                    </>
                  )}
                </ErrorMessage>

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
                    <ErrorMessage name="houseNum">
                      {(msg) => (
                        <>
                          <div style={{ color: "red", display: "block" }}>
                            {msg}
                          </div>
                        </>
                      )}
                    </ErrorMessage>
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
                    <ErrorMessage name="flatNum">
                      {(msg) => (
                        <>
                          <div style={{ color: "red", display: "block" }}>
                            {msg}
                          </div>
                        </>
                      )}
                    </ErrorMessage>
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
                <ErrorMessage name="problem">
                  {(msg) => (
                    <>
                      <div style={{ color: "red", display: "block" }}>
                        {msg}
                      </div>
                    </>
                  )}
                </ErrorMessage>
                <Button disabled={false} variant="contained" type="submit">
                  Qo'shish
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
export default InputFields;

let validationSchema = Yup.object({
  professionId: Yup.number().required("*biriktirilagan kasb turini kiriting"),
  addressId: Yup.number().required("*shahar nomini kiriting"),
  firstName: Yup.string().required("*ismini kiriting"),
  lastName: Yup.string().required("*familyasini kiriting"),
  phoneNumber: Yup.string().required("*telefon nomerini kiriting"),
  houseNum: Yup.string().max("3").required("*raqamni kiriting"),
  flatNum: Yup.string().max("3").required("*raqamni kiriting"),
  problem: Yup.string().required("*muammosini kiriting"),
});
